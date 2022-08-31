document.addEventListener("DOMContentLoaded", init)
const URL_API = 'http://localhost:3000/api/';

var customers = [];

function init() {
    search()
}

function agregar(){
    clear();
    abirFormulario();
}

function abirFormulario() {
    htmlModal = document.getElementById("modal");
    htmlModal.setAttribute("class", "modale opened");
}

function cerrarModal() {
    htmlModal = document.getElementById("modal");
    htmlModal.setAttribute("class", "modale");
}

async function search() {
    var url = URL_API + 'customers';
    var response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    customers = await response.json()
    var html = ''
    for (customer of customers) {
        var row = `
        <tr>
            <td>${customer.fistname}</td>
            <td>${customer.lastname}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
    
            <td>
                <a  onclick="edit(${customer.id})" class="myButton">Editar</a>
                <a  onclick="remove(${customer.id})" class="btnDelete">Eliminar</a>
            </td>
        </tr>`
        html = html + row;
    }

    document.querySelector('#customers > tbody').outerHTML = html
}

function edit(id){
    abirFormulario();
    var customer = customers.find(x => x.id == id);
    document.getElementById('txtId').value = customer.id;
    document.getElementById('txtFirsname').value = customer.fistname;
    document.getElementById('txtLastname').value = customer.lastname;
    document.getElementById('txtPhone').value    = customer.phone;
    document.getElementById('txtEmail').value    = customer.email;
    document.getElementById('txtAddress').value  = customer.address;
}

async function remove(id) {
    respuesta = confirm('¿Seguro que quiere eliminar ?')

    if (respuesta) {
        var url = URL_API + 'customers/' + id;
        await fetch(url, {
            "method": 'DELETE',
            "headers": {
                "Content-Type": 'application/json'
            }
        })
        window.location.reload();

    }

}

function clear(){
    document.getElementById('txtId').value = '';
    document.getElementById('txtFirsname').value = '';
    document.getElementById('txtLastname').value = '';
    document.getElementById('txtPhone').value    = '';
    document.getElementById('txtEmail').value    = '';
    document.getElementById('txtAddress').value  = '';
}

async function save() {
    var data = {
        "fistname": document.getElementById('txtFirsname').value,
        "lastname": document.getElementById('txtLastname').value,
        "phone":    document.getElementById('txtPhone').value,
        "email":    document.getElementById('txtEmail').value,
        "address":  document.getElementById('txtAddress').value
      };
      var id = document.getElementById('txtId').value;

      if(id !=  ''){
        data.id = id
      }

    var url = URL_API + 'customers';
    await fetch(url, {
        "method": 'POST',
        "body": JSON.stringify(data),
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    window.location.reload();
}


