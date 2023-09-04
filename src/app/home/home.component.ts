import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { interval, Observable, of, timer } from "rxjs";
import {
  catchError,
  delayWhen,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { createHttpObservable } from "../../utils";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {}

  ngOnInit() {
    const url = "/api/courses";

    const http$ = createHttpObservable(url);

    const courses$ = http$.pipe(
      map((res) => Object.values(res["payload"])),
      shareReplay()
    );

    this.beginnerCourses$ = courses$.pipe(
      map((courses: Course[]) =>
        courses.filter((course) => course.category === "BEGINNER")
      )
    );
    this.advancedCourses$ = courses$.pipe(
      map((courses: Course[]) =>
        courses.filter((course) => course.category === "ADVANCED")
      )
    );

    //   courses$.subscribe((courses) => {
    //     // coursesList.push(...courses)
    //     // coursesList.forEach(course => {
    //     //   console.log(course.longDescription)
    //     // })
    //     // this.beginnerCourses = courses.filter(
    //     //   (course) => course.category === "BEGINNER"
    //     // );
    //     // this.advancedCourses = courses.filter(
    //     //   (course) => course.category === "ADVANCED"
    //     // );
    //   });
    // }
  }
}
