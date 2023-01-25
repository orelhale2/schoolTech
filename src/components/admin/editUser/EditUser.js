import { useEffect, useState } from "react";
import "./EditUser.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Component_MultiSelect from "../../Component_MultiSelect";
import Style_BasicButton from "../../style/Style_BasicButton";

function EditUser(props) {
  let navigate = useNavigate();
  // שומר את כל הנתונים של המשתמש
  let [editUser, setEditUser] = useState(null);

  // שומר את רמת השמתמש המקורית + את השינוי
  let [newLevelPermission, setNewLevelPermission] = useState(null);

  // שומר את כל השמות של הכיתות שיש בבית הספר כאבייקטים ושולח אותם לכומפוננטה של הרשימת בחירת כיתות
  let [optionsMultiSelect, setOptionsMultiSelect] = useState([]);

  // מחזיק את כל השינויים שנעשו ברשימת פתיחה של בחירת כיתה
  let [selected, setSelected] = useState([]);

  // רשימת רמת גישה
  let listLevel = ["Unauthorized", "admin", "teacher", "secretary"];

  useEffect(() => {
    if (props.dataToEditUser) {
      console.log("userToEdit = ", props.dataToEditUser);
      setEditUser(props.dataToEditUser);
    }
  }, [props.dataToEditUser]);

  useEffect(() => {
    if (editUser && !optionsMultiSelect[0]) {
      setNewLevelPermission(props.dataToEditUser.level_permission);
      console.log("dataToEditUser = ", props.dataToEditUser);

      axios
        .get("http://localhost:4000/admin/getListOfAllTheClasses")
        .then((listClass) => {
          let arrAllOptions = listClass.data.map((c) => {
            return { label: c, value: c };
          });
          setOptionsMultiSelect(arrAllOptions);

          let arrAllOptionsThatSelected = [];
          if (typeof props.dataToEditUser.class_permission == "object") {
            props.dataToEditUser.class_permission.forEach((nameOfClass) => {
              nameOfClass = nameOfClass.replaceAll(" ", "");

              if (listClass.data.includes(nameOfClass) == true) {
                arrAllOptionsThatSelected.push({
                  label: nameOfClass,
                  value: nameOfClass,
                });
              }
            });
          }

          setSelected((eee) => {
            return [...arrAllOptionsThatSelected, ...eee];
          });
        });
    }
  }, [editUser]);

  function update() {
    let newListClass = [];
    if (newLevelPermission == "teacher") {
      newListClass = selected.map((e) => e.value);
    }

    let data = {
      email: editUser.email,
      class_permission: newListClass,
      level_permission: newLevelPermission,
    };
    
    editUser.class_permission = newListClass;
    editUser.level_permission = newLevelPermission;


    axios.put("http://localhost:4000/admin/editUser", data).then((dddd) => {
        console.log("dddd = ", dddd);
        props.setDateFromServer((e)=>{
            let arr = [...e]
            arr.splice(arr.findIndex(e => e.email == editUser.email),1,editUser)
            return arr
        })
      props.setUserToEdit(null);
    });
  }

  return (
    <div>
      {editUser && (
        <div>
          {newLevelPermission && (
            <form>
              <br />
              {/* https://mui.com/material-ui/react-radio-button/ */}
              {/* אם יהיה זמן - לשנות לעצוב יותר יפה */}
              {listLevel.map((nameLevel, i2) => {
                return (
                  <>
                    <label for={nameLevel} className="inputRadio">
                      <input
                        checked={newLevelPermission == nameLevel ? true : false}
                        type="radio"
                        name="_"
                        onClick={() => {
                          setNewLevelPermission(nameLevel);
                        }}
                      />
                      {" " + nameLevel}
                    </label>
                    <br />
                  </>
                );
              })}
            </form>
          )}

          {newLevelPermission == "teacher" && (
            <>
              <br />
              <Component_MultiSelect
                title="List class"
                options={optionsMultiSelect}
                selected={selected}
                setSelected={setSelected}
              />
            </>
          )}

          <br />

          <Style_BasicButton text={"Update"} onClick={update} />
          
        </div>
      )}
    </div>
  );
}

export default EditUser;
