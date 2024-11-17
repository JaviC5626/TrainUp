import firestore from "@react-native-firebase/firestore"

export const getRoutine = async (day, level) => {
    try {
      const routineDoc = await firestore()
        .collection('trainingPlans')
        .doc(level)
        .collection('days')
        .doc(day)
        .get();
  
      if (routineDoc.exists) {
       return routineDoc.data();
      } else {
        console.log('No routine found for this day and level');
        return null;
      }
    } catch (error) {
      console.error('Error fetching routine:', error);
      return null;
    }
  };