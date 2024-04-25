import { useState, useEffect } from "react";
import "./DStyles.css";

const DPrompt = ({ groupNamesParent, setGroupNamesParent, onClose }) => {
    const [groupName, setGroupName] = useState("");
    const [bgColor, setBgColor] = useState("rgb(179, 139, 250)");

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };

    const handleColorChange = (event) => {
        setBgColor(getComputedStyle(event.target).backgroundColor);
    };

    const saveGroup = () => {
        const newGroup = { name: groupName, color: bgColor };
        const updatedGroups = [...groupNamesParent, newGroup];
        setGroupNamesParent(updatedGroups);
        localStorage.setItem("groupNames", JSON.stringify(updatedGroups));
        setGroupName("");
        onClose();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.className === "desk_prompt_overlay") {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const colorDivClass = (color) =>
        `prompt_color_input_color_${color} ${
            bgColor ===
            getComputedStyle(document.documentElement).getPropertyValue(
                `--color-${color}`
            )
                ? "highlight"
                : ""
        }`;

    return (
        <div className="desk_prompt_overlay">
            <div className="prompt">
                <div className="prompt_title">Create New Notes Group</div>
                <div className="prompt_input">
                    <span>Group Name</span>
                    <input
                        type="text"
                        value={groupName}
                        onChange={handleGroupNameChange}
                        placeholder="Enter Group Name..."
                    />
                </div>
                <div className="prompt_color_input">
                    <span>Choose color</span>
                    <div className="prompt_color_input_color">
                        <div
                            className={colorDivClass(1)}
                            onClick={handleColorChange}
                        ></div>
                        <div
                            className={colorDivClass(2)}
                            onClick={handleColorChange}
                        ></div>
                        <div
                            className={colorDivClass(3)}
                            onClick={handleColorChange}
                        ></div>
                        <div
                            className={colorDivClass(4)}
                            onClick={handleColorChange}
                        ></div>
                        <div
                            className={colorDivClass(5)}
                            onClick={handleColorChange}
                        ></div>
                        <div
                            className={colorDivClass(6)}
                            onClick={handleColorChange}
                        ></div>
                    </div>
                </div>
                <div className="prompt_close">
                    <button onClick={saveGroup} disabled={!groupName.trim()}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DPrompt;
