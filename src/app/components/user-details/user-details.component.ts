import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserDetails(+userId).subscribe({
        next: (data: User) => {
          this.user = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          alert('Failed to load user details.');
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
