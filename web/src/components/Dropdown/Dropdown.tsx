import React from "react";

interface DropDownProps {
  buttonText: string;
  list: string[];
  onSelect: (item: string) => void;
  displayClearOption: boolean;
}

export const DropDownComponent: React.FC<DropDownProps> = ({
  buttonText,
  list,
  onSelect,
  displayClearOption
}): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="dropdown">
      <button onClick={handleOpen}>{buttonText}</button>
      {open ? (
        <ul className="menu">
          {list.map((item) => {
            return (
              <li key={item} className="menu-item">
                <button onClick={() => onSelect(item)}>{item}</button>
              </li>
            );
          })}
          {displayClearOption && (
            <li className="menu-item">
              <button onClick={() => onSelect("")}>Clear</button>
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
};
