import { Box, Center, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FORM_TYPE } from '~/constants';
import FormUpload from './components/FormUpload';

const defaultValues = {
  title: '',
  type: undefined,
  content: '',
  banner: '',
  ingredients: [],
};

const data = {
  banner:
    'https://www.brit.co/media-library/libra-compatibility-women-laughing-together-in-bed.jpg?id=31794237&amp;width=1200&amp;height=799',
  content:
    '<p><img src="https://www.brit.co/media-library/libra-compatibility-women-laughing-together-in-bed.jpg?id=31794237&amp;width=1200&amp;height=799"></p><p>Out of all of the zodiac signs, Libras are known to be the most relationship oriented. Once they find their S.O., they’ll jump into a romantic situation head first. Life is like a rom-com to them and partnerships have their ups and downs but always work out in the end. This diplomatic, intellectual, and peaceful zodiac sign is a believer in love conquering all.</p><p>Here is how Libra compatibility stacks up for each zodiac sign, ranging from the highest to lowest compatibility factors:</p><h3><strong>Libra and Aries</strong></h3><p>Opposites can attract when Libra and Aries unite. Aries will learn to be patient through Libra, who is a master of chill and balance — but the path won’t be easy and happen over night. The change within Aries can take years. On the flipside, Libra will enjoy the aggressiveness of Aries (at times) who gets the fire under their bellies moving and going. Both zodiac signs motivate each other to be great and amazing. However, they can be a tad arrogant when together and make outsiders feel as though they’re not as cool as this cardinal sign club that’s built for only two.</p><h3><strong>Libra and Taurus</strong></h3><p>Since both Libra and Taurus are ruled by the planet Venus, they will share a similar aesthetic and artistic sentiments. Upon a deeper look, it can be hard for them to find a common ground as long as they both m continue to be stubborn. Compromise is the key ingredient here. After all, Venus wants everything on their terms and won’t compromise for anything less than fabulous. As long as these two zodiac signs can keep the relationship flight and manage to have a lot of fun together, then they can maintain a long teen partnership fueled by sex, drugs, and rock ‘n roll.</p><h3><strong>Libra and Gemini</strong></h3><p>These two air signs like to flirt a lot with each other. Sincere, both relationship oriented signs, due to the fact that they are dualistic in nature. They will spend a lot of time conversing with each other over every topic under the sun, as well as longing for new insights and clarity on matters. There isn’t any topic that we will disagree on, as long as they don’t tell it into politics. The reason being is because Gemini can see two sides of the situation, or as libra believes in their own version of what a moral high ground feels like.</p><h3><strong>Libra and Cancer</strong></h3><p>Libra and cancer are two cardinal signs that will fight to make their relationship work, no matter what stands in their way. Once cancer digs are pinchers into Libra, it will be hard for their signs to get away. Conversely, once Libra decides that they want to be in a commitment with Cancer, they will do whatever it takes to make the relationship work. Although they can fight like cats and dogs, if and when things get bad, they always run back to each other due to the fact that they are a codependent astrological match that will stay together through thick and thin.</p><h3><strong>Libra and Leo</strong></h3><p>As long is, Leo is centerstage in any relationship, they will be happy. They cannot handle being in a partnership with someone who takes the lead. It makes him feel it, so they are second fiddle. All the more reason why we will be up to join a union with the zodiac sign Libra, because the air sign will allow them to be the strong and fierce dominant person that they were born to be. Libra won’t stand in the way of the lion, step on their toes, tell them what to do, or even create drama with Leo (that is Leo’s job).</p><h3><strong>Libra and Virgo</strong></h3><p>Please two signs can get along very well, as long as they respect the others, desire for privacy and freedom. This means that Virgo will want to spend time being reflective and alone without the constant gaze of Libra. Also, Virgo doesn’t want to answer to anyone but themselves. If Libra can learn to respect their boundaries and focus on themselves and not others (which will be a very hard task to implement at first), then this partnership is great. Now, Virgo needs to let Libra leave the house without questioning their motives or whereabouts to maintain the excitement, appeal, and mystery of the relationship.</p><h3><strong>Libra and Libra</strong></h3><p>Libra and Libra are the dynamic relationship duo. Since they are the same sign and are relationship oriented, they mirror each other’s need to be partnered up at all times (even through friendships and non-amorous relationships). However, when conflict arises in this peaceful relationship, they are fast at putting out fires immediately — mostly in an effort to maintain chill vibes at all times. Outsiders may think that they are a passive aggressive couple, but it’s only because they’d like to canoodle instead of having to defend their beliefs to others. They definitely want to make love and not war.</p><h3><strong>Libra and Scorpio</strong></h3><p>Libra and Scorpio share intense and intimate bonds that can last a lifetime. Being that Scorpio often forms close alliances with those they care about quickly, it will be easy for a Libra, who is extremely relationship oriented to feel it, so they are secure within the partnership. The only caveat is that trust within the relationship will take a hot minute. But, once they are able to believe in each other and have confidence within each other, then they’ll be golden. As long as they feel safe and protected by the other, this partnership can withstand the test of time.</p><h3><strong>Libra and Sagittarius</strong></h3><p>Libra and Sagittarius can spend hours gossiping and chatting about every situation under the sun. But, the foundation of the partnership is extremely superficial and essence, based on a strong foundation. This can result in Sagittarius flaking out of long term plans with Libra. The main reason that they are extremely incompatible is because Sagittarius likes to be free, without constraints, whereas Libra enjoys commitment. At the very most, authorization or friends with benefits situations will suit them. However, there is not enough drive for them to have a long-term relationship due to the significant differences that keep them apart.</p><h3><strong>Libra and Capricorn</strong></h3><p>Both of these cardinal signs like to have structure when it comes to romance, which is why they’ll often find each other and align. The only main issue that can keep them apart is that Capricorn tends to be a workaholic and isn’t known to relax until they’re done with a business deal. The lack of balance can send Libra into a tailspin, as they must be centered at all times. When Libra’s scale tips to one side over another it can create havoc in their life that takes months to recover from. If Capricorn can find a middle ground then there is the potential of the relationship working out well.</p><h3><strong>Libra and Aquarius</strong></h3><p>Libra and Aquarius are two air signs that definitely go together. Both will connect over creative project</p>',
  ingredients: [{ name: { id: 1, name: 'category2' }, value: '123gt' }],
  title: 'Here Are The Zodiac Signs Libra Is Most Compatible With',
  type: { id: 0, name: 'category1' },
};

const UploadPage = () => {
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState();

  useEffect(() => {
    // call api
    if (id) setInitialValues(data);
    else setInitialValues(defaultValues);
  }, [id]);

  const handleUmountForm = (data) => {
    // call api save daft
    console.log({ name: 'draft', data });
  };

  const handleSubmit = (data) => {
    // call api save daft
    console.log({ name: 'submit', data });
  };

  return (
    <Center h="100%">
      <Flex
        direction="column"
        className="container"
        bg="white"
        w="95%"
        h="98%"
        borderRadius="8px"
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
        p="2.4rem 5.6rem"
      >
        <Text as="h2" fontSize="2.4rem" lineHeight="1.5" fontWeight={600}>
          {id ? 'Edit' : 'Upload'} post
        </Text>

        <Text as="p" fontSize="1.8rem" lineHeight="1.5" color="textColor.200" mt="2px">
          {id ? 'Edit' : 'Upload'} a post of your account
        </Text>

        <Box flex="1" mt="2.4rem">
          {initialValues && (
            <FormUpload
              handleUmountForm={handleUmountForm}
              handleSubmit={handleSubmit}
              defaultValues={initialValues}
              formType={initialValues ? FORM_TYPE.edit : FORM_TYPE.add}
            />
          )}
        </Box>
      </Flex>
    </Center>
  );
};

export default UploadPage;
