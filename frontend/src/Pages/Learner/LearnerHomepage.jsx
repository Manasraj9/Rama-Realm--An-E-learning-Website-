//A9hWTFu44MeqAYa8
import Courses from '@/Components/LearnerComponents/Courses';
import Footer from '@/Components/LearnerComponents/Footer_learner';
import Learnernavbar from '@/Components/LearnerComponents/LearnerNavbar';
import Learner_hero from '@/Components/LearnerComponents/Learner_hero';
import { Router } from 'react-router-dom';
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