const express = require('express');
const router = express.Router();

const RubricRoutes = require('./RubricRoutes');
const RubricItemRoutes = require('./RubricItemRoutes');
const CourseRoutes = require('./CourseRoutes');
const SectionRoutes = require('./SectionRoutes');
const SemesterRoutes = require('./SemesterRoutes');
const AssignmentRoutes = require('./AssignmentRoutes');

router.use('/rubrics', RubricRoutes);
router.use('/items', RubricItemRoutes);
router.use('/courses', CourseRoutes);
router.use('/sections', SectionRoutes);
router.use('/semesters', SemesterRoutes);
router.use('/assignments', AssignmentRoutes);

module.exports = router;