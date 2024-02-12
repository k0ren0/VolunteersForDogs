import * as DogsModel from '../models/dogs.model.js';

export const _addDog = async (req, res) => {
    try {
        const { name, breed, age } = req.body;
        const user_id = req.user.user_id;
        const newDog = await DogsModel.addDog(user_id, name, breed, age);
        res.status(201).json({ message: 'Dog added successfully', dog: newDog });
    } catch (error) {
        console.error('Error saving dog:', error);
        res.status(500).json({ error: 'Error saving dog' });
    }
};

export const _getDogsByUserId = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const dogs = await DogsModel.getDogsByUserId(user_id);
        res.json(dogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching dogs", error });
    }
};

export const _updateDog = async (req, res) => {
    try {
        const { dog_id } = req.params;
        const { name, breed, age } = req.body;
        const user_id = req.user.user_id;
        const updatedDog = await DogsModel.updateDogById(dog_id, user_id, name, breed, age);
        if (updatedDog) {
            res.json({ message: 'Dog updated successfully', dog: updatedDog });
        } else {
            res.status(404).json({ message: 'Dog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating dog", error });
    }
};

export const _deleteDog = async (req, res) => {
    try {
        const { dog_id } = req.params;
        const user_id = req.user.user_id;
        await DogsModel.deleteDogById(dog_id, user_id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting dog", error });
    }
};


// import * as DogsModel from '../models/dogs.model.js';

// export const _addDog = async (req, res) => {
//   console.log("_addDog work");
//   try {
//       const { name, breed, age } = req.body;
//       const user_id = req.user.user_id; 
     
//       await DogsModel.addDog(user_id, breed, name, age);

//       console.log('Dog successfully added to the database');
//       res.status(201).json({ message: 'Dog added successfully' });
//   } catch (error) {
//       console.error('Error saving dog:', error);
//       res.status(500).json({ error: 'Error saving dog' });
//   }
// };

// export const _getDogsByUserId = async (req, res) => {
//   console.log("_getDogsByUserId work");
//   const user_id = req.user.user_id;
//   console.log("user_id ", user_id );

//   try {
//     const dogs = await DogsModel.getDogsByUserId(user_id);
//     res.json(dogs);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching dogs", error });
//   }
// };

// export const _updateDog = async (req, res) => {
//   console.log("_updateDog work");
//   const { dog_id } = req.params;
//   const { breed, name, age } = req.body;
//   const user_id = req.user.user_id;

//   try {
//     const updatedDog = await DogsModel.updateDogById(dog_id, user_id, breed, name, age);
//     res.json(updatedDog[0]);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating dog", error });
//   }
// };

// export const _deleteDog = async (req, res) => {
//   const { dog_id } = req.params;
//   const user_id = req.user.user_id;

//   try {
//     await DogsModel.deleteDogById(dog_id, user_id);
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting dog", error });
//   }
// };


