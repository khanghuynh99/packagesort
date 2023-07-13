import logo from './logo.svg';
// import { List, ListItem } from "@material-ui/core";
import React from 'react';
import { useState } from 'react';

import './App.css';
// const App = () => {
//   const handleMenuOne = () => {
//     console.log('clicked one');
//   };

//   const handleMenuTwo = () => {
//     console.log('clicked two');
//   };

//   return (
//     <Dropdown
//       trigger={<button>Dropdown</button>}
//       menu={[
//         <button onClick={handleMenuOne}>Menu 1</button>,
//         <button onClick={handleMenuTwo}>Menu 2</button>,
//       ]}
//     />
//   );
// };

const Dropdown = ({ trigger, menu }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown">
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
              {React.cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
function App() {

const [year, setYear] = useState('');
const [updated, setUpdated] = useState(year);
const [make, setMake] = useState('');
const [updatedMake, setUpdatedMake] = useState(make);
const [model, setModel] = useState('');
const [updatedModel, setUpdatedModel] = useState(model);

const handleChange = (event) => {
  setYear(event.target.value)
}
  const [open, setOpen] = React.useState(false);
  const handleMenuOne = () => {
    setUpdated(year)
  };

  const handleMenuTwo = () => {
    setUpdated(make)
  };

  const handleMenuThree = () => {
    setUpdated(model)
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {/* Edit <code>src/App.js</code> and save to reload. */}
          Enter the car type of your vehicle:
        </p>
        <Dropdown
      trigger={<button>Year</button>}
      menu={[
        <button onClick={handleMenuOne}>2020</button>,
        <button onClick={handleMenuOne}>2021</button>,
        <button onClick={handleMenuOne}>2022</button>,
      ]}
    />
            <Dropdown
      trigger={<button>Make</button>}
      menu={[
        <button onClick={handleMenuTwo}>Audi</button>,
        <button onClick={handleMenuTwo}>Ford</button>,
      ]}
    />
            <Dropdown
      trigger={<button>Model</button>}
      menu={[
        <button onClick={handleMenuThree}>A1 City Car</button>,
        <button onClick={handleMenuThree}>Land Rover Discover</button>,
      ]}
    />

        {/* <div className="dropdown">
      <button onClick={handleOpen}>Dropdown</button>
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button>Menu 1</button>
          </li>
          <li className="menu-item">
            <button>Menu 2</button>
          </li>
        </ul>
      ) : null}
      {open ? <div>Is Open</div> : <div>Is Closed</div>} */}
    {/* </div> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Submit
        </a>
      </header>
    </div>
  );
}

export default App;
