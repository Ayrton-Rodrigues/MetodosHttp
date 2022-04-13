import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  @Input()
  student?: Student;

  @Input()
  card: boolean = true;

  constructor(private studentService: StudentsService,
    private router: Router) { }

  ngOnInit(): void {
  }

  removeStudent(){
    console.log(this.student?.id)
    if(this.student && this.student.id)
    this.studentService.remove(this.student.id).subscribe((result) => {
      alert(result.message)
      this.router.navigateByUrl('/students')      
    })
    
  }


  body = {
    name: 'Ayrton',
    email: 'Ayrton@gmail.com'
  }



  update(){
    console.log(this.student?.id)
    if(this.student && this.student.id)
    
    this.studentService.updateStudent(      
      this.student.id, this.body
       )
       .subscribe(() => {   
        console.log(this.body)
    });
  }
}
