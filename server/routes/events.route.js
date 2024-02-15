import express from "express";
import { body, validationResult } from 'express-validator';
import { verifytoken } from "../middleware/verifyToken.js";
import { db } from "../config/db.js";
import moment from 'moment';

const router = express.Router();

// Функция логирования для отслеживания приходящих запросов
function logRequest(req, res, next) {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
}

router.use(logRequest); // Применение миддлвара логирования ко всем маршрутам

// Middleware для валидации
const eventValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('date').notEmpty().isDate().withMessage('Date must be a valid date'),
    body('country').notEmpty().withMessage('Country is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('volunteer_needed').isNumeric().withMessage('Volunteer needed must be a number'),
    body('event_type').notEmpty().isIn(['volunteer', 'customer']).withMessage('Event type is required'),
    body('location').optional(),
    // body('start_time').optional(),
    // body('end_time').optional(),
    body('days_of_week').optional().isString().withMessage('Days of the week must be a string')
    .matches(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)(,(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday))*$/)
    .withMessage('Invalid value for days of the week')
];

router.post('/', verifytoken, eventValidationRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, date, country, city, volunteer_needed, event_type, days_of_week, location, start_time, end_time } = req.body;
        const user_id = req.user.user_id; // Предполагается, что это значение вы устанавливаете из токена или сессии

        // Нет необходимости заново декларировать переменные, которые уже были объявлены выше
        const eventData = {
            user_id, title, description, date, country, city, volunteer_needed, event_type, days_of_week, location, start_time, end_time
        };

        await db('events').insert(eventData);
        res.status(201).json({ message: 'Event added successfully' });
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({ error: 'Error saving event' });
    }
});

router.put('/:event_id', verifytoken, eventValidationRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { event_id } = req.params;
    const { title, description, date, country, city, volunteer_needed, event_type, days_of_week, location, start_time, end_time } = req.body;
    const user_id = req.user.user_id;

    try {
        const eventData = { title, description, date: formattedDate, country, city, volunteer_needed, event_type, days_of_week, location, start_time, end_time };

        const updated = await db('events').where({ user_id, event_id }).update(eventData);

        if (updated) {
            res.json({ message: 'Event updated successfully.' });
        } else {
            res.status(404).json({ error: 'Event not found.' });
        }
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Error updating event.' });
    }
});

router.delete('/:event_id', verifytoken, async (req, res) => {
    const { event_id } = req.params;
    const user_id = req.user.user_id;

    try {
        const deleted = await db('events').where({ user_id, event_id }).del();

        if (deleted) {
            res.json({ message: 'Event deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Event not found.' });
        }
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Error deleting event.' });
    }
});

router.get('/', verifytoken, async (req, res) => {
    const { title, city, date, event_type, dogBreed, days_of_week } = req.query;
    const user_id = req.user.user_id;

    try {
        let query = db('events').where({ user_id });
        
        if (title) {
            query = query.andWhere('title', 'like', `%${title}%`);
        }
        if (city) {
            query = query.andWhere('city', '=', city);
        }
        if (date) {
            const formattedDate = moment(date).format('YYYY-MM-DD');
            query = query.andWhere('date', '=', formattedDate);
        }
        if (event_type) {
            query = query.andWhere('event_type', '=', event_type);
        }
        if (dogBreed) {
            query = query.andWhere('dogBreed', 'like', `%${dogBreed}%`);
        }
        if (days_of_week) {
            query = query.andWhere('days_of_week', 'like', `%${days_of_week}%`);
        }

        const events = await query;
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Error fetching events' });
    }
});


export default router;




////////////////worked_change_date

// import express from "express";
// import { body, validationResult } from 'express-validator';
// import { verifytoken } from "../middleware/verifyToken.js";
// import { db } from "../config/db.js";

// const router = express.Router();

// router.post('/',  
//     verifytoken,  
//     [
//         // body('title').notEmpty().withMessage('Title is required'),
//         // body('description').notEmpty().withMessage('Description is required'),
//         // body('date').notEmpty().withMessage('Date is required').isDate(),
//         // body('country').notEmpty().withMessage('Country is required'),
//         // body('city').notEmpty().withMessage('City is required'),
//         // body('volunteer_needed').isNumeric().withMessage('Volunteer needed must be a number'),
//         // body('event_type').notEmpty().withMessage('Event type is required').isIn(['volunteer', 'customer']),
//         // // Поля location, start_time и end_time теперь обозначены как необязательные
//         // body('location').optional(),
//         // body('start_time').optional(),
//         // body('end_time').optional(),
//         // body('days_of_week').optional().isString().withMessage('Days of the week must be a string')
//         // .matches(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)(,(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday))*$/)
//         // .withMessage('Invalid value for days of the week')
//         body('title').optional().notEmpty().withMessage('Title is required'),
//         body('description').optional().notEmpty().withMessage('Description is required'),
//         body('date').optional().isDate().withMessage('Date must be a valid date'),
//         body('country').optional().notEmpty().withMessage('Country is required'),
//         body('city').optional().notEmpty().withMessage('City is required'),
//         body('volunteer_needed').optional().isNumeric().withMessage('Volunteer needed must be a number'),
//         body('event_type').optional().isIn(['volunteer', 'customer']).withMessage('Event type is required'),
//         body('location').optional(),
//         body('start_time').optional(),
//         body('end_time').optional(),
//         body('days_of_week').optional().isString().withMessage('Days of the week must be a string')
//         .matches(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)(,(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday))*$/)
//         .withMessage('Invalid value for days of the week')
//     ],  
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         try {
//             const { title, description, date, country, city, volunteer_needed, event_type, days_of_week, location, start_time, end_time } = req.body;
//             const user_id = req.user.user_id;

//             // Создание объекта с данными события
//             const eventData = { user_id, title, description, date, country, city, volunteer_needed, event_type, days_of_week };

//             // Проверка наличия необязательных полей и их сохранение
//             if (location) {
//                 eventData.location = location;
//             }

//             if (start_time) {
//                 eventData.start_time = start_time;
//             }

//             if (end_time) {
//                 eventData.end_time = end_time;
//             }

//             // Сохранение данных в базу данных
//             await db('events').insert(eventData);
//             res.status(201).json({ message: 'Event added successfully' });
//         } catch (error) {
//             console.error('Error saving event:', error);
//             res.status(500).json({ error: 'Error saving event' });
//         }
//     }
// );

// router.get('/', verifytoken, async (req, res) => {
//     const { title, city, date, event_type, dogBreed, days_of_week } = req.query;
//     const user_id = req.user.user_id;

//     try {
//         // Построение запроса с фильтрацией
//         let query = db('events').where({ user_id });
        
//         if (title) {
//             query = query.andWhere('title', 'like', `%${title}%`);
//         }
//         if (city) {
//             query = query.andWhere('city', '=', city);
//         }
//         if (date) {
//             query = query.andWhere('date', '=', date);
//         }
//         if (event_type) {
//             query = query.andWhere('event_type', '=', event_type);
//         }
//         if (dogBreed) {
//             // Предполагается, что в вашей таблице есть столбец dogBreed
//             query = query.andWhere('dogBreed', 'like', `%${dogBreed}%`);
//         }
//         if (days_of_week) {
//             // Предполагается, что days_of_week хранится как строка
//             query = query.andWhere('days_of_week', 'like', `%${days_of_week}%`);
//         }

//         const events = await query;
//         res.json(events);
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         res.status(500).json({ error: 'Error fetching events' });
//     }
// });

// router.put('/:event_id',  
//     verifytoken,  
//     [
//         body('title').optional().notEmpty().withMessage('Title is required'),
//         body('description').optional().notEmpty().withMessage('Description is required'),
//         body('date').optional().notEmpty().withMessage('Date is required').isDate(),
//         body('country').optional().notEmpty().withMessage('Country is required'),
//         body('city').optional().notEmpty().withMessage('City is required'),
//         body('volunteer_needed').optional().isNumeric().withMessage('Volunteer needed must be a number'),
//         body('event_type').optional().notEmpty().withMessage('Event type is required').isIn(['volunteer', 'customer']),
//         // body('start_time').optional().notEmpty().withMessage('Start time is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
//         // body('end_time').optional().notEmpty().withMessage('End time is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
//         body('days_of_week').optional().isString().withMessage('Days of the week must be a string').matches(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)(,(Mon|Tue|Wed|Thu|Fri|Sat|Sun))*$/)
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { event_id } = req.params;
//         const { title, description, date, country, city, volunteer_needed, event_type, days_of_week } = req.body;
//         const user_id = req.user.user_id;

//         try {
//             const updated = await db('events')
//                 .where({ user_id, event_id })
//                 .update({ title, description, date, country, city, volunteer_needed, event_type,  days_of_week });

//             if (updated) {
//                 res.json({ message: 'Event updated successfully.' });
//             } else {
//                 res.status(404).json({ error: 'Event not found.' });
//             }
//         } catch (error) {
//             console.error('Error updating event:', error);
//             res.status(500).json({ error: 'Error updating event.' });
//         }
//     }
// );

// router.delete('/:event_id', verifytoken, async (req, res) => {
//     const { event_id } = req.params;
//     const user_id = req.user.user_id;

//     try {
//         const deleted = await db('events')
//         .where({ user_id, event_id })
//         .del();

//     if (deleted) {
//         res.json({ message: 'Event deleted successfully.' });
//     } else {
//         res.status(404).json({ error: 'Event not found.' });
//     }
// } catch (error) {
//     console.error('Error deleting event:', error);
//     res.status(500).json({ error: 'Error deleting event.' });
// }
// });

// // Подтверждение токена (демонстрационный маршрут)
// router.get("/api/verifytoken", verifytoken, (req, res) => {
// res.sendStatus(200);
// });

// export default router;



// import express from "express";
// import { body, validationResult } from 'express-validator';
// import { verifytoken } from "../middleware/verifyToken.js";
// import { db } from "../config/db.js";

// const router = express.Router();

// router.post('/',  
//     verifytoken,  
//     [
//         body('title').notEmpty().withMessage('Title is required'),
//         body('description').notEmpty().withMessage('Description is required'),
//         body('date').notEmpty().withMessage('Date is required').isDate(),
//         body('country').notEmpty().withMessage('Country is required'),
//         body('city').notEmpty().withMessage('City is required'),
//         body('volunteer_needed').isNumeric().withMessage('Volunteer needed must be a number'),
//         body('event_type').notEmpty().withMessage('Event type is required').isIn(['volunteer', 'customer']),
//         body('start_time').notEmpty().withMessage('Start time is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
//         body('end_time').notEmpty().withMessage('End time is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
//         body('days_of_week').optional().isString().withMessage('Days of the week must be a string')
//         .matches(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)(,(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday))*$/)
//         .withMessage('Invalid value for days of the week')

//     ],  
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         try {
//             const { title, description, date, country, city, volunteer_needed, event_type, start_time, end_time, days_of_week } = req.body;
//             const user_id = req.user.user_id;
//             await db('events').insert({ user_id, title, description, date, country, city, volunteer_needed, event_type, start_time, end_time, days_of_week });
//             res.status(201).json({ message: 'Event added successfully' });
//         } catch (error) {
//             console.error('Error saving event:', error);
//             res.status(500).json({ error: 'Error saving event' });
//         }
//     }
// );

// router.get('/', verifytoken, async (req, res) => {
//     const { title, city, date, event_type, start_time, end_time, dogBreed, days_of_week } = req.query;
//     const user_id = req.user.user_id;

//     try {
//         // Построение запроса с фильтрацией
//         let query = db('events').where({ user_id });
        
//         if (title) {
//             query = query.andWhere('title', 'like', `%${title}%`);
//         }
//         if (city) {
//             query = query.andWhere('city', '=', city);
//         }
//         if (date) {
//             query = query.andWhere('date', '=', date);
//         }
//         if (event_type) {
//             query = query.andWhere('event_type', '=', event_type);
//         }
//         if (start_time) {
//             query = query.andWhere('start_time', '>=', start_time);
//         }
//         if (end_time) {
//             query = query.andWhere('end_time', '<=', end_time);
//         }
//         if (dogBreed) {
//             // Предполагается, что в вашей таблице есть столбец dogBreed
//             query = query.andWhere('dogBreed', 'like', `%${dogBreed}%`);
//         }
//         if (days_of_week) {
//             // Предполагается, что days_of_week хранится как строка
//             query = query.andWhere('days_of_week', 'like', `%${days_of_week}%`);
//         }

//         const events = await query;
//         res.json(events);
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         res.status(500).json({ error: 'Error fetching events' });
//     }
// });



// router.get('/', verifytoken, async (req, res) => {
//     const user_id = req.user.user_id;

//     try {
//         const events = await db('events').where({ user_id });
//         res.json(events);
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         res.status(500).json({ error: 'Error fetching events' });
//     }
// });

// router.put('/:event_id',  
//     verifytoken,  
//     [
//         body('title').optional().notEmpty().withMessage('Title is required'),
//         body('description').optional().notEmpty().withMessage('Description is required'),
//         body('date').optional().notEmpty().withMessage('Date is required').isDate(),
//         body('country').optional().notEmpty().withMessage('Country is required'),
//         body('city').optional().notEmpty().withMessage('City is required'),
//         body('volunteer_needed').optional().isNumeric().withMessage('Volunteer needed must be a number'),
//         body('event_type').optional().notEmpty().withMessage('Event type is required').isIn(['volunteer', 'customer']),
//         body('start_time').optional().notEmpty().withMessage('Start time is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
//         body('end_time').optional().notEmpty().withMessage('End time is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
//         body('days_of_week').optional().isString().withMessage('Days of the week must be a string').matches(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)(,(Mon|Tue|Wed|Thu|Fri|Sat|Sun))*$/)
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { event_id } = req.params;
//         const { title, description, date, country, city, volunteer_needed, event_type, start_time, end_time, days_of_week } = req.body;
//         const user_id = req.user.user_id;

//         try {
//             const updated = await db('events')
//                 .where({ user_id, event_id })
//                 .update({ title, description, date, country, city, volunteer_needed, event_type, start_time, end_time, days_of_week });

//             if (updated) {
//                 res.json({ message: 'Event updated successfully.' });
//             } else {
//                 res.status(404).json({ error: 'Event not found.' });
//             }
//         } catch (error) {
//             console.error('Error updating event:', error);
//             res.status(500).json({ error: 'Error updating event.' });
//         }
//     }
// );

// router.delete('/:event_id', verifytoken, async (req, res) => {
//     const { event_id } = req.params;
//     const user_id = req.user.user_id;

//     try {
//         const deleted = await db('events')
//         .where({ user_id, event_id })
//         .del();

//     if (deleted) {
//         res.json({ message: 'Event deleted successfully.' });
//     } else {
//         res.status(404).json({ error: 'Event not found.' });
//     }
// } catch (error) {
//     console.error('Error deleting event:', error);
//     res.status(500).json({ error: 'Error deleting event.' });
// }
// });

// // Подтверждение токена (демонстрационный маршрут)
// router.get("/api/verifytoken", verifytoken, (req, res) => {
// res.sendStatus(200);
// });

// export default router;







