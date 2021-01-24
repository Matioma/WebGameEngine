import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Sevices/auth.service';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css'],
})
export class ProjectEditorComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
}
