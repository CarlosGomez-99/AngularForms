import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchField = new FormControl();
  results: any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.searchField.valueChanges
      .pipe(debounceTime(300))
      .subscribe(query => {
        this.search(query);
      });
  }

  private search(query: string) {
    const API = 'ZEGctqf5p8UoT0uBFJKoSzcSNLhixwS2';
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${API}&q=${query}&limit=25&offset=0&rating=g&lang=en`).pipe(
      map((response: any) => {
        return response.data.map(item => item.images.downsized)
      })
    ).subscribe((data: any) => {
      console.log(data);
      this.results = data;
    });
  }

}
