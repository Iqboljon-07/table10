//npm install -g json-server
//json-server --watch db.json

// let obj = {
//   name: "John Doe",
//   email: "johndoe@gmail.com",
//   phone: 1234567890,
//   Actions: "edit delete",
// };
let table = document.querySelector("table");
let add = document.querySelector("#add");

async function getData(url) {
  let data = await fetch(url);
  let res = await data.json();

  return res;
}
getData("http://localhost:3000/users").then((data) => {
  console.log(data);
  let tr = document.createElement("tr");
  Object.keys(data[0]).forEach((key) => {
    let th = document.createElement("th");

    table.append(tr);
    tr.append(th);
    th.style.border = "2px solid red";
    th.style.padding = "5px";
    th.textContent = key;
  });
});

////////////////////////////////////////////////////////////////////////////////////////
getData("http://localhost:3000/users")
  .then((data) => {
    data.forEach((val) => {
      let row = document.createElement("tr");
      let tdid = document.createElement("td");
      tdid.textContent = val.id;
      let tdname = document.createElement("td");
      tdname.textContent = val.name;
      tdname.style.border = "2px solid red";
      let tdemail = document.createElement("td");
      tdemail.textContent = val.email;
      tdemail.style.border = "2px solid red";
      let tdphone = document.createElement("td");
      tdphone.textContent = val.phone;
      tdphone.style.border = "2px solid red";
      let tdActions = document.createElement("td");

      let btn1 = document.createElement("button");
      // btn1.textContent = "Edit";
      let btn2 = document.createElement("button");
      // btn2.textContent = "Delete";
      tdActions.append(btn1, btn2);
      let icon = document.createElement("i");
      icon.classList.add("fas", "fa-trash-alt", "text-danger");
      btn2.append(icon);
      let editicon = document.createElement("i");
      editicon.classList.add("fas", "fa-edit", "text-success");
      btn1.append(editicon);
      tdActions.style.display = "flex";
      tdActions.style.justifyContent = "space-around";

      table.append(row);
      row.append(tdid, tdname, tdemail, tdphone, tdActions);
      row.style.border = "2px solid blue";

      btn2.addEventListener("click", () => {
        fetch(`http://localhost:3000/users/${val.id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              row.remove();
              console.log("User deleted");
            } else {
              console.error("Error deleting user:", error);
              alert("Error deleting user");
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      });

      //////////////////////////////////////////////////////////////
      btn1.addEventListener("click", () => {
        let id = val.id;
        let newName = prompt("Name");
        let newemail = prompt("Email");
        let newphone = prompt("Phone");
        let action = tdActions;

        if (newName && newemail && newphone) {
          fetch(`http://localhost:3000/users/${val.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,

              name: newName,
              email: newemail,
              phone: newphone,
              action,
            }),
          }).then((response) => {
            if (response.ok) {
              console.log("User updated");
              tdname.textContent = newName;
              tdemail.textContent = newemail;
              tdphone.textContent = newphone;
            } else {
              console.error("Error updating user:", error);
              throw new error("Error updating user");
            }
          });
        }
      });

      ////////////////////////////////////////////////////////////////////////////
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Finished");
  });

/////////////////////////////////////////////////////////////////////////
add.addEventListener("click", () => {
  // let id = Math.floor(Math.random() * 1000) + 1;

  let name = prompt("Name");
  let email = prompt("Email");
  let phone = prompt("Phone");
  let action = "delit edit";

  if (name && email && phone) {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        action,
      }),
    })
      .then((response) => response.json())
      .then((newUser) => {
        let row = document.createElement("tr");
        let tdid = document.createElement("td");
        tdid.textContent = newUser.id;
        let tdname = document.createElement("td");
        tdname.textContent = newUser.name;
        tdname.style.border = "2px solid red";
        let tdemail = document.createElement("td");
        tdemail.textContent = newUser.email;
        tdemail.style.border = "2px solid red";
        let tdphone = document.createElement("td");
        tdphone.textContent = newUser.phone;
        tdphone.style.border = "2px solid red";
        let tdActions = document.createElement("td");

        let btn1 = document.createElement("button");
        // btn1.textContent = "Edit";
        let btn2 = document.createElement("button");
        // btn2.textContent = "Delete";
        tdActions.append(btn1, btn2);
        let icon = document.createElement("i");
        icon.classList.add("fas", "fa-trash-alt", "text-danger");
        btn2.append(icon);
        let editicon = document.createElement("i");
        editicon.classList.add("fas", "fa-edit", "text-success");
        btn1.append(editicon);
        tdActions.style.display = "flex";
        tdActions.style.justifyContent = "space-around";

        table.append(row);
        row.append(tdid, tdname, tdemail, tdphone, tdActions);
        row.style.border = "2px solid blue";

        btn1.addEventListener("click", () => {
          let newName = prompt("Name");
          let newemail = prompt("Email");
          let newphone = prompt("Phone");

          if (newName && newemail && newphone) {
            fetch(`http://localhost:3000/users/${newUser.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: newName,
                email: newemail,
                phone: newphone,
              }),
            }).then((response) => {
              if (response.ok) {
                console.log("User updated");
                tdname.textContent = newName;
                tdemail.textContent = newemail;
                tdphone.textContent = newphone;
              } else {
                console.error("Error updating user:", error);
                throw new error("Error updating user");
              }
            });
          }
        });

        btn2.addEventListener("click", () => {
          fetch(`http://localhost:3000/users/${newUser.id}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.ok) {
                row.remove();
                console.log("User deleted");
              } else {
                console.error("Error deleting user:", error);
                alert("Error deleting user");
              }
            })
            .catch((error) => {
              console.error("Error deleting user:", error);
            });

          //////////////////////////////////////////////
        });
      });
  } else {
    alert("ma'lumotlarni to'ldiring");
  }
});

getData("http://localhost:3000/users").then((data) => {});
