# Infollion Task 1 - Dynamic Form in React

This project is a dynamic form created using **React** that allows users to add parent and nested sub-questions dynamically. The form supports multiple levels of nesting (parent and child questions) and includes functionalities for form submission, auto-numbering, and the display of questions in a hierarchical format.

## Features

### 1. Add New Parent Questions

- A button labeled "Add New Question" allows users to dynamically add new questions.
- Each question includes:
  - A text input field to enter the question.
  - A dropdown to select the type of question ("Short Answer" or "True/False").

### 2. Add Nested Child Questions

- If a **True/False** question is selected and the answer is "True", an option to add a child question appears.
- Child questions can be nested recursively.
- Child questions have the same structure as parent questions (text input, dropdown).

### 3. Delete Functionality

- Each parent and child question includes a delete button to remove the question.
- If a parent question is deleted, all nested child questions are also deleted.

### 4. Auto-numbering

- The form automatically numbers parent and child questions according to their position and depth (e.g., Q1, Q1.1, Q1.1.1, Q2).

### 5. Form Submission

- On submission, the questions (both parent and child) are displayed in a hierarchical format for review.

### Bonus Features (Optional)

- **Local Storage Persistence**: The form saves its state in local storage so users can return without losing their progress.
- **Basic Reordering**: Users can reorder questions using drag-and-drop.

## Installation and Setup

1. **Clone the repository:**

   `bash git clone https://github.com/Abhin4vKumar/infollion-task-1.git && cd infollion-task-1`

2. **Install dependencies:**
   `bash npm install`

3. **Run the development server:**
   `npm start`

## Dependencies

The project relies on the following major dependencies:

- React (v18.3.1): JavaScript library for building user interfaces.
- Framer Motion (v11.5.4): Used for animations in the app.
- React Icons (v5.3.0): Provides a variety of icons used in the app.
- TailwindCSS (v3.4.11): Utility-first CSS framework for styling.
- TailwindCSS Animate (v1.0.7): Animation utilities for TailwindCSS.
- React Testing Library: Tools for testing React components.
- React Scripts (v5.0.1): Configuration and scripts for Create React App.
- Web Vitals: Provides utility methods to measure key performance metrics.

## Folder Structure

├── public # Static files
├── src
│ ├── components # Form components and UI elements
│ ├── App.js # Main entry point for the application
│ ├── index.js # React DOM rendering
├── package.json # Project metadata and dependencies
└── README.md # Project documentation
