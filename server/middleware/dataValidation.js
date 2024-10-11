import { check } from "express-validator";
export const  userDataValidation = [
    check('name', 'Name is invalid').trim().notEmpty(),
    check('email', 'Email is invalid').trim().notEmpty(),
    check('password', 'password is invalid').trim().notEmpty(),
    
  ];



  export const taskDataValidation = [
    check('title', 'Title is required and should not be empty').trim().notEmpty(),
  
    check('description', 'Description should be a valid text').optional().trim(),
  
    check('priority', 'Priority must be one of: low, medium, high').isIn(['low', 'medium', 'high']),
  
    check('due_date', 'Due date must be a valid date').optional().notEmpty().isISO8601(), 
  ];
  