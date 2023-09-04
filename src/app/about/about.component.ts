import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { createHttpObservable } from '../../utils';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const coursesList = []
    const url = '/api/courses'
    const http$ = createHttpObservable(url)
    const courses$ = http$
      .pipe(
        map(res => Object.values(res['payload'])),
        shareReplay()
      )

    courses$.subscribe(
      courses => {
        coursesList.push(...courses)
        coursesList.forEach(course => {
          console.log(course.longDescription)
          console.log(course.category)
        })
      })
    // console.log(coursesList)


  }

}
