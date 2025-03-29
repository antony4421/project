

import Home from "views/home.js";
import Register from "views/examples/Register.js";
 

import Employee from "views/examples/employee.jsx";
import ContactForm from "views/examples/trydemo";
import AddEmployee from "views/examples/addemp.jsx";


var routes = [

 
  {
    path: "/AddEmployee",
    name: "AddEmployee",
    icon: "ni ni-tv-2 text-primary",
    component: <AddEmployee />,
    
  },
  {
    path: "/home",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Home />,
   
  },
  {
    path: "/EmployeeList",
    name: "Employee",
    icon: "ni ni-tv-2 text-primary",
    component: <Employee />,
    
  },

 
  
  
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/trydemo",
    name: "ContactForm",
    icon: "ni ni-circle-08 text-pink",
    component: <ContactForm />,
    layout: "/auth",
  },
];
export default routes;
