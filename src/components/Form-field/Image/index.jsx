import { Box, Button, Flex, Image, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdUpload } from 'react-icons/md';
import { toast } from 'react-toastify';
import firebase from '~/app/firebase';
import Loading from '~/components/Loading';
import { FIREBASE_ERR_CODE } from '~/constants';
import { firebaseImageName, imageValidatorHandler } from '~/utils';

const ImageField = ({ name, label = name, setImageUrl, textHelper, isReset, isSave }) => {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadTask = useRef();
  const isUploaded = useRef(false);

  const { getRootProps, getInputProps, open, acceptedFiles, fileRejections } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    validator: imageValidatorHandler,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
    onDrop: (acceptedFiles) => {
      isUploaded.current = false;
      // update again isReset for not delete object prev
      isReset.current = false;
      isSave.current = false;
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const previews = files.map((file, idx) => (
    <Image
      key={idx}
      src={file.preview}
      alt="preview"
      onLoad={() => {
        URL.revokeObjectURL(file.preview);
      }}
    />
  ));

  const handleDelete = () => {
    // handle comp unmount and edit image
    if (files.length !== 0 && isUploaded.current) {
      setLoading(true);
      const storageRef = ref(firebase.getStorage(), files[0].firebaseName);

      deleteObject(storageRef)
        .then(() => {
          setImageUrl('');
          setFiles([]);
          setLoading(false);
        })
        .catch((error) => {
          switch (error.code) {
            case FIREBASE_ERR_CODE.storage.objectNotFound:
              console.log({ error });
              break;
            default:
              toast.error(error.message);
          }
        });
    }
  };

  useEffect(() => {
    if (isReset.current) handleDelete();
  }, [isReset.current]);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setLoading(true);
      const file = acceptedFiles[0];
      file.firebaseName = firebaseImageName(file);

      // sau khi ghep api them 1 field nua cho func firebaseImageName -> userId
      const storageRef = ref(firebase.getStorage(), file.firebaseName);
      uploadTask.current = uploadBytesResumable(storageRef, file);

      uploadTask.current.on(
        'state_changed',
        () => {},
        (error) => {
          // Handle unsuccessful uploads
          switch (error.code) {
            case FIREBASE_ERR_CODE.storage.userCanceled:
              toast.error('User canceled the upload/download process');
              break;
            default:
              console.log({ error });
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.current.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            isUploaded.current = true;
            setLoading(false);
          });
        }
      );
    }
    return () => {
      if (isUploaded.current) {
        if (!isSave.current) {
          handleDelete();
        }
      } else {
        if (uploadTask.current) uploadTask.current.cancel();
      }
    };
  }, [acceptedFiles]);

  // handle errors
  useEffect(() => {
    if (fileRejections.length > 0) {
      const error = fileRejections[0].errors[0];
      toast.error(error.message);
    }
  }, [fileRejections]);

  return (
    <Flex direction="column">
      <Text as="h1" fontSize="1.5rem" fontWeight={600} textTransform="capitalize">
        {label}
      </Text>

      <Box minH="20rem" maxH="20rem" h="100%" position="relative">
        {loading && <Loading />}
        {files.length > 0 ? (
          <Flex
            justify="center"
            align="center"
            h="100%"
            w="100%"
            overflow="hidden"
            position="relative"
            _hover={{
              '.preview-actions': {
                opacity: '1',
              },
            }}
          >
            {previews}

            {/* actions */}
            <Flex
              className="preview-actions"
              opacity="0"
              position="absolute"
              justify="space-evenly"
              align="center"
              inset="0"
              bg="rgba(0,0,0,0.27)"
              h="100%"
              transition="opacity 0.25s ease-out"
            >
              <Button
                variant="outline-default"
                borderColor="yellow.400"
                color="yellow.400"
                position="relative"
                zIndex="1"
                sx={{
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    w: 0,
                    bg: 'yellow.400',
                    zIndex: '-1',
                    transition: 'width 0.75s ease',
                  },
                }}
                _hover={{
                  color: 'white',
                  '&::before': {
                    width: '100%',
                  },
                }}
                onClick={open}
              >
                Edit
              </Button>

              <Button
                variant="outline-default"
                color="red.600"
                borderColor="red.600"
                position="relative"
                zIndex="1"
                sx={{
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    w: 0,
                    bg: 'red.600',
                    zIndex: '-1',
                    transition: 'width 0.75s ease',
                  },
                }}
                _hover={{
                  color: 'white',
                  borderColor: 'red.600',
                  '&::before': {
                    width: '100%',
                  },
                }}
                onClick={() => {
                  handleDelete();
                  setFiles([]);
                  setIsDragOver(false);
                }}
              >
                Delete
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex
            p="2rem 0"
            direction="column"
            justify="center"
            align="center"
            gap="0.35rem"
            color={isDragOver ? 'textColor.400' : 'textColor.300'}
            w="100%"
            h="100%"
            border={isDragOver ? '2px dashed #0144FF' : '2px dashed rgba(22, 24, 35, 0.12)'}
            transition="all 0.25s linear"
            fontSize="1.6rem"
            lineHeight="22px"
            {...getRootProps({ className: 'dropzone' })}
          >
            <input {...getInputProps()} />
            {isDragOver ? (
              <Text className="text">Drop image here</Text>
            ) : (
              <>
                <MdUpload fontSize="4rem" />
                <Text as="p" className={isDragOver && 'text'}>
                  Drag 'n' drop here
                </Text>
                <Text className={isDragOver && 'text'}>or</Text>
                <Text
                  className={isDragOver && 'text'}
                  cursor="pointer"
                  color="#0144FF"
                  onClick={open}
                >
                  Browse file
                </Text>
              </>
            )}
          </Flex>
        )}
      </Box>

      {Array.isArray(textHelper) ? (
        <UnorderedList>
          {textHelper.map((item, idx) => (
            <ListItem key={idx} color="rgba(22, 24, 35, 0.5)">
              <Text
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize="12px"
                lineHeight="15px"
                margin="8px 0px 0"
                color="rgba(22, 24, 35, 0.5)"
                pr="2rem"
              >
                {item}
              </Text>
            </ListItem>
          ))}
        </UnorderedList>
      ) : (
        <Text
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          fontSize="12px"
          lineHeight="15px"
          margin="8px 0px 0"
          color="rgba(22, 24, 35, 0.5)"
          pr="2rem"
        >
          {textHelper}
        </Text>
      )}
    </Flex>
  );
};

export default ImageField;
