/* eslint-disable react/jsx-key */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Link,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import User1 from '~/assets/images/comment-author-01.jpg';
import Dislike from '~/assets/images/dislike.png';
import Like from '~/assets/images/like.png';
import Picture from '~/assets/images/reus.jpg';
// import User2 from '~/assets/images/comment-author-02.jpg';
// import User3 from '~/assets/images/comment-author-03.jpg';

const author = {
  firstName: 'Marco',
  lastName: 'Reus',
  email: 'reus@example.com',
  phone: '1234567890',
  gender: 'male',
  dob: '01-01-2001',
};

const post = {
  id: 0,
  author: 'Marco Reus',
  title: 'The prince with crystal legs of Dortmund',
  type: 'European',
  content:
    "Borussia Dortmund skipper Marco Reus faces missing the upcoming Qatar World Cup with Germany after being stretchered off in Saturday's derby match against Schalke. Reus, 33, had to leave the pitch aided by Dortmund medical staff in the first half following a collision with Schalke’s Florian Flick. The Dortmund captain has been plagued by injuries in the build up to major international tournaments before with his latest injury creating further cause for concern. Reus unnaturally rolled his ankle as he and Flick both challenged for the ball and was left in tears as he lay on the turf receiving treatment. Eventually it was decided the German needed to leave the pitch via stretcher with four medical personnel taking him back down the tunnel on a stretcher. The yellow wall of the Signal Iduna Park rose to their feet to give their long-serving player a standing ovation as Reus exited the pitch to undergo more tests to determine the severity of his injury. With just over two months to go until the winter World Cup kicks off, Reus now faces the prospect of having to undergo a lengthy rehabilitation process. Reus was selected as part of national team coach Hansi Flick's upcoming Nations League squad for matches against Hungary and England at the end of September. Flick will now be left sweating on the fitness of the experienced winger who is one of the more experienced members of the youthful-looking Germany squad. Reus previously missed Germany’s World Cup win in 2014 with an ankle injury sustained in a warm-up game that ruled hi m out of the entire tournament before a groin injury ruled him out of the 2016 Euros. The German then played in his nations unsuccessful World Cup defence in Russia in 2018. He then opted to skip the next European Championship in England to recover from domestic football with his Bundesliga club.",
  created_date: '17 September 2022',
  like: 11,
};
const comments = [
  {
    id: 1,
    username: 'Haaland',
    content: 'Dưới đáy xã hội',
    replyto: null,
    created_date: '17 September 2022',
  },
  {
    id: 2,
    username: 'Ronaldo',
    content: '???',
    replyto: 1,
    created_date: '17 September 2022',
  },
  {
    id: 3,
    username: 'Khoasian',
    content: 'King Kai!!!',
    replyto: null,
    created_date: '17 September 2022',
  },
  {
    id: 4,
    username: 'Thịnh-sama',
    content: 'boku no pico no1',
    replyto: null,
    created_date: '17 September 2022',
  },
  {
    id: 5,
    username: 'Pic0',
    content: '(o･ω･o)',
    replyto: 4,
    created_date: '17 September 2022',
  },
];

const PostDetail = () => {
  useEffect(() => {
    //call api load post-detail, load category, load author
  });

  const [content, setContent] = useState('');

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch('url', {
        method: 'POST',
        body: JSON.stringify({
          content: content,
          postid: 0,
          replyto: null,
          userid: null,
        }),
      });
      // let resJson = await res.json();
      if (res.status === 200) {
        // successfully
      } else {
        // error
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box h="100%" pt="9rem" pb="5rem">
      <Grid templateColumns="repeat(3, 1fr)" gap="3rem" className="container">
        <GridItem colSpan={2}>
          <Image maxH="30rem" w="100%" src={Picture} alt="reus" />
          <Box
            padding="40px"
            borderRight="1px"
            borderLeft="1px"
            borderBottom="1px"
            borderColor="#eee"
          >
            <Box
              fontSize="18px"
              textTransform="uppercase"
              letterSpacing="0.5px"
              fontWeight="900"
              color="#f48840"
            >
              {post.type}
            </Box>
            <Box
              fontSize="24px"
              textTransform="capitalize"
              letterSpacing="0.5px"
              fontWeight="900"
              color="#20232e"
              m="10px 0px 12px 0px"
            >
              {post.title}
            </Box>
            <HStack spacing="10px">
              <Text fontSize="14px" color="#AAAAAA" ml="8px">
                {post.author}
              </Text>
              <Text fontSize="14px" color="#AAAAAA">
                {' '}
                |{' '}
              </Text>
              <Text fontSize="14px" color="#AAAAAA" mr="8px">
                {post.created_date}
              </Text>
            </HStack>
            <Box fontSize="15px" color="#7A7A7A" m="25px 0px" p="25px 0px">
              {post.content}
            </Box>
            <Flex gap="50px">
              <Image w="50px" h="50px" src={Like} /*onClick={handleLike} */ />
              <Image w="50px" h="50px" src={Dislike} /*onClick={handleLike} */ />
            </Flex>
          </Box>
          <Box padding="40px" border="1px" borderColor="#eee">
            <Box color="20232E" fontSize="18px" m="30px 0px 25px" p="0px 0px 15px" fontWeight="900">
              {comments.length} COMMENTS
            </Box>
            {comments.map((item, idx) => {
              var temp = item;
              if (item.replyto == null) {
                comments.map((item2) => {
                  if (item2.replyto == item.id) {
                    temp = item2;
                  }
                });
                if (temp != item) {
                  return (
                    <Box key={idx}>
                      <Grid templateRows="repeat(4, 1fr)" templateColumns="repeat(6, 1fr)">
                        <GridItem rowSpan={4} colSpan={1}>
                          <Image h="100px" w="100px" src={User1} />
                        </GridItem>
                        <GridItem colSpan={5} rowSpan={1}>
                          <Flex gap="5">
                            <Box fontSize="19" fontWeight="800">
                              {item.username}
                            </Box>
                            <Box fontSize="14" color="#AAAAAA" mt="5px">
                              {item.created_date}
                            </Box>
                          </Flex>
                        </GridItem>

                        <GridItem colSpan={5} rowSpan={3}>
                          <Box fontSize="15" color="#7A7A7A">
                            {item.content}
                          </Box>
                        </GridItem>
                      </Grid>
                      <Grid
                        pl="80px"
                        templateRows="repeat(4, 1fr)"
                        templateColumns="repeat(6, 1fr)"
                      >
                        <GridItem rowSpan={4} colSpan={1}>
                          <Image h="100px" w="100px" src={User1} />
                        </GridItem>
                        <GridItem colSpan={5} rowSpan={1} ml="17px">
                          <Flex gap="5">
                            <Box fontSize="19" fontWeight="800">
                              {temp.username}
                            </Box>
                            <Box fontSize="14" color="#AAAAAA" mt="5px">
                              {temp.created_date}
                            </Box>
                          </Flex>
                        </GridItem>

                        <GridItem colSpan={5} rowSpan={3} ml="20px">
                          <Box fontSize="15" color="#7A7A7A">
                            {temp.content}
                          </Box>
                        </GridItem>
                      </Grid>
                    </Box>
                  );
                }
                return (
                  <Grid templateRows="repeat(4, 1fr)" templateColumns="repeat(6, 1fr)">
                    <GridItem rowSpan={4} colSpan={1}>
                      <Image h="100px" w="100px" src={User1} />
                    </GridItem>
                    <GridItem colSpan={5} rowSpan={1}>
                      <Flex gap="5">
                        <Box fontSize="19" fontWeight="800">
                          {item.username}
                        </Box>
                        <Box fontSize="14" color="#AAAAAA" mt="5px">
                          {item.created_date}
                        </Box>
                      </Flex>
                    </GridItem>

                    <GridItem colSpan={5} rowSpan={3}>
                      <Box fontSize="15" color="#7A7A7A">
                        {item.content}
                      </Box>
                    </GridItem>
                  </Grid>
                );
              }
            })}
          </Box>

          <FormControl isRequired onSubmit={handleSubmit} mt="30px">
            <FormLabel
              color="20232E"
              fontSize="18px"
              m="30px 0px 0px"
              p="0px 0px 15px"
              fontWeight="900"
            >
              YOUR COMMENT
            </FormLabel>
            <Textarea
              value={content}
              h="150px"
              overflow="auto"
              ressize="vertical"
              fontSize="13px"
              mb="30px"
              placeholder="Leave your comment here"
              onChange={(e) => setContent(e.target.value)}
            />
            <Button type="submit" value="Submit">
              Submit
            </Button>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <Box border="4px" p="10px" borderColor="#eee">
            <Box
              color="20232E"
              fontSize="24px"
              m="30px 0px 25px"
              p="0px 0px 15px"
              fontWeight="900"
              borderBottom="1px"
              borderColor="#eee"
            >
              CATEGORY
            </Box>
            <Box color="20232E" fontSize="20px" fontWeight="650" mb="15px">
              <Link>- Asian</Link>
            </Box>
            <Box color="20232E" fontSize="20px" fontWeight="650" mb="15px">
              <Link>- European</Link>
            </Box>
            <Box color="20232E" fontSize="20px" fontWeight="650" mb="15px">
              <Link>- Category 2</Link>
            </Box>
            <Box color="20232E" fontSize="20px" fontWeight="650" mb="15px">
              <Link>- Category 3</Link>
            </Box>
            <Box color="20232E" fontSize="20px" fontWeight="650" mb="15px">
              <Link>- Category 4</Link>
            </Box>
          </Box>
          <Box mt="20px" p="10px" align="center">
            <Box
              color="20232E"
              fontSize="24px"
              m="30px 0px 25px"
              p="0px 0px 15px"
              fontWeight="900"
              borderBottom="1px"
              borderColor="#eee"
            >
              AUTHOR
            </Box>
            <Image w="120px" h="100px" src={User1} alt="reus" />
            <Box color="20232E" fontSize="20px" fontWeight="650">
              {author.firstName} {author.lastName}
            </Box>
            <Box fontSize="15px" color="7A7A7A">
              {author.email}
            </Box>
            <Box fontSize="15px" color="7A7A7A">
              {author.phone}
            </Box>
            <Box fontSize="15px" color="7A7A7A">
              {author.gender}
            </Box>
            <Box fontSize="15px" color="7A7A7A">
              {author.dob}
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PostDetail;
