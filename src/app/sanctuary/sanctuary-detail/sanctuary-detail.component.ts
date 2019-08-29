import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PetSanctuary } from '../graphql.schema';

@Component({
  selector: 'app-sanctuary-detail',
  templateUrl: './sanctuary-detail.component.html',
  styleUrls: ['./sanctuary-detail.component.scss']
})
export class SanctuaryDetailComponent implements OnInit {
  sanctuary: PetSanctuary;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getSanctuary();
  }

  getSanctuary(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
  }

}
