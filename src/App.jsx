import React, { useState, useEffect } from 'react';
import SemesterSummary from './components/SemesterSummary';
import ClassCard from './components/ClassCard';
import { calculateSemesterStats } from './utils/gradeCalculations';
import './App.css';

const STORAGE_KEY = 'semester_gpa_calculator_data_v1';

const INITIAL_SAMPLE_CLASSES = [
  {
    id: 'class-1',
    name: 'Business Analytics',
    credits: '3',
    assignments: [
      { id: 'a-1', name: 'Homework & Labs', weight: '25', grade: '95' },
      { id: 'a-2', name: 'Midterm Exam', weight: '35', grade: '89' },
      { id: 'a-3', name: 'Final Research Project', weight: '40', grade: '94' },
    ],
  },
  {
    id: 'class-2',
    name: 'Financial Management',
    credits: '3',
    assignments: [
      { id: 'a-4', name: 'Case Studies', weight: '30', grade: '91' },
      { id: 'a-5', name: 'Midterm Exam', weight: '30', grade: '86' },
      { id: 'a-6', name: 'Final Exam', weight: '40', grade: '90' },
    ],
  },
];

export default function App() {
  const [classes, setClasses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_SAMPLE_CLASSES;
    } catch {
      return INITIAL_SAMPLE_CLASSES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
    } catch {
      // Ignore storage quota errors
    }
  }, [classes]);

  const handleAddClass = () => {
    const newClass = {
      id: `class-${Date.now()}`,
      name: `Class ${classes.length + 1}`,
      credits: '3',
      assignments: [
        { id: `assign-${Date.now()}-1`, name: 'Assignment 1', weight: '100', grade: '' },
      ],
    };
    setClasses((prev) => [...prev, newClass]);
  };

  const handleUpdateCourse = (classId, field, value) => {
    setClasses((prev) =>
      prev.map((course) =>
        course.id === classId ? { ...course, [field]: value } : course
      )
    );
  };

  const handleDeleteCourse = (classId) => {
    setClasses((prev) => prev.filter((course) => course.id !== classId));
  };

  const handleAddAssignment = (classId) => {
    const newAssignment = {
      id: `assign-${Date.now()}`,
      name: '',
      weight: '',
      grade: '',
    };
    setClasses((prev) =>
      prev.map((course) =>
        course.id === classId
          ? { ...course, assignments: [...course.assignments, newAssignment] }
          : course
      )
    );
  };

  const handleUpdateAssignment = (classId, assignmentId, field, value) => {
    setClasses((prev) =>
      prev.map((course) => {
        if (course.id !== classId) return course;
        return {
          ...course,
          assignments: course.assignments.map((assignment) =>
            assignment.id === assignmentId
              ? { ...assignment, [field]: value }
              : assignment
          ),
        };
      })
    );
  };

  const handleDeleteAssignment = (classId, assignmentId) => {
    setClasses((prev) =>
      prev.map((course) => {
        if (course.id !== classId) return course;
        return {
          ...course,
          assignments: course.assignments.filter((a) => a.id !== assignmentId),
        };
      })
    );
  };

  const handleClearAll = () => {
    setClasses([]);
  };

  const semesterStats = calculateSemesterStats(classes);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-dark bg-dark shadow-sm mb-4">
        <div className="container">
          <span className="navbar-brand fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-calculator-fill text-primary"></i>
            Semester Grade & GPA Calculator
          </span>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={handleClearAll}
              disabled={classes.length === 0}
            >
              Clear All
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm fw-semibold"
              onClick={handleAddClass}
            >
              <i className="bi bi-plus-lg me-1"></i>Add Class
            </button>
          </div>
        </div>
      </nav>

      <main className="container flex-grow-1 pb-5">
        <SemesterSummary stats={semesterStats} classCount={classes.length} />

        {classes.length === 0 ? (
          <div className="card border-0 shadow-sm text-center py-5">
            <div className="card-body">
              <i className="bi bi-journal-plus display-4 text-muted mb-3 d-block"></i>
              <h5 className="fw-semibold">No Classes Added Yet</h5>
              <p className="text-muted mb-3">
                Add your classes, credit hours, and weighted assignments to calculate your semester average and GPA.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddClass}
              >
                <i className="bi bi-plus-lg me-1"></i>Add Your First Class
              </button>
            </div>
          </div>
        ) : (
          <>
            {classes.map((course) => (
              <ClassCard
                key={course.id}
                course={course}
                onUpdateCourse={handleUpdateCourse}
                onDeleteCourse={handleDeleteCourse}
                onAddAssignment={handleAddAssignment}
                onUpdateAssignment={handleUpdateAssignment}
                onDeleteAssignment={handleDeleteAssignment}
              />
            ))}

            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-primary px-4"
                onClick={handleAddClass}
              >
                <i className="bi bi-plus-lg me-1"></i>Add Another Class
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}