let student = [];
let successstudent = [];
let FailedStudent = [];

function AddStudent(name,age,mark)
{
    return {name: name , age : age , mark : mark};
}

student.push(AddStudent("abdullah",20,77));

student.push(AddStudent("abdullah",20,12));


student.push(AddStudent("abdullah",20,15));


student.push(AddStudent("abdullah",20,50));



for(let i = 0 ; i<=student.length ; i++)
{
if(student[i].mark>=50)
successstudent.push(student[i]);
else
FailedStudent.push(student[i]);
}


console.log("Success : ",successstudent);
console.log("Failed :" , FailedStudent );