//A9hWTFu44MeqAYa8
import Courses from '@/Components/LearnerComponents/Courses';
import Footer from '@/Components/LearnerComponents/Footer_learner';
import Learnernavbar from '@/Components/LearnerComponents/Learnernavbar';
import Learner_hero from '@/Components/LearnerComponents/Learner_hero';

const LearnerHomepage = () => {
  return (
    <>
    <Learnernavbar />
    <Learner_hero />
    <Courses/>
    <Footer/>
    </>
  )
}

export default LearnerHomepage