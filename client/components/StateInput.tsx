import React from 'react';
import { useDispatch } from 'react-redux';
import { updateState1, updateState2 } from '../reducers/stateReducer';
import StateName from '../assets/stateName';

const StateInput = ({ side }: { side: string }) => {
  const dispatch = useDispatch();

  //fetch data on dropdown selector for state
  const dropFetch = (e: any) => {
    e.preventDefault();
    const stateDropdown: any = document.getElementById(`${side}`);
    const stateSelected = stateDropdown.value;

    fetch(`/api/data/${stateSelected}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (side === 'left') {
          dispatch(updateState1(data));
        } else if (side === 'right') {
          dispatch(updateState2(data));
        }
      })
      .catch((error) => console.log(error));
  };

  //create state dropdown
  const stateArray: any[] = [];
  StateName.forEach((state) => {
    stateArray.push(<option value={state}>{state}</option>);
  });

  return (
    <div className='stateInput'>
      <h2>Search by state</h2>
      <form>
        <label>Please select a state or territory: </label>
        <select id={`${side}`}>{stateArray}</select>
        <button onClick={dropFetch}>Search</button>
      </form>
    </div>
  );
};

export default StateInput;
