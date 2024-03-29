import React, { useState, useEffect } from 'react';
import {
  TrashCanIcon,
  EditIcon,
  UncheckedIcon,
  CheckIcon,
} from '../Icons/Icons';

function TodoList(props) {
  const [checkedArr, setCheckedArr] = useState(() => {
    const savedCheckTodos = localStorage.getItem('checkedTask');
    if (savedCheckTodos) {
      return JSON.parse(savedCheckTodos);
    } else {
      return [];
    }
  });

  const handleCheck = (index) => {
    if (checkedArr.indexOf(index) > -1) {
      let newArr = [...checkedArr];
      let finalIndex = newArr.findIndex((ele) => ele === index);
      newArr.splice(finalIndex, 1);
      setCheckedArr(newArr);
    } else {
      setCheckedArr([...checkedArr, index]);
      localStorage.removeItem('checkedTask', JSON.stringify(checkedArr));
    }
  };

  useEffect(() => {
    localStorage.setItem('checkedTask', JSON.stringify(checkedArr));
  }, [checkedArr]);
  return (
    <div className="task-container">
      <ul className="list-container">
        {props.list.map((addTodo, index) => (
          <li key={index} className="added-task">
            <button
              className="uncheck-btn"
              onClick={() => handleCheck(`${index}`)}
              style={{
                textDecoration:
                  checkedArr.indexOf(`${index}`) > -1 ? `line-through` : `none`,
              }}
            >
              {checkedArr.indexOf(`${index}`) > -1 ? (
                <CheckIcon className="uncheck-icon" />
              ) : (
                <UncheckedIcon className="uncheck-icon" />
              )}

              {addTodo}
            </button>
            <div className="edit-del-wraper">
              <button
                className="delete-btn"
                onClick={() => props.removeData(index, checkedArr)}
              >
                <TrashCanIcon className="delete-icon" />
              </button>
              <button
                className="Edit-btn"
                onClick={() => props.editData(index)}
              >
                <EditIcon className="Edit-icon" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
