import { Component, OnInit } from '@angular/core';
import { faGraduationCap, faComment, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  faGraduationCap = faGraduationCap;
  faComment = faComment;
  faPlus = faPlus;

  public categories;
  public addingTopic = {};
  public addingCategory = false;
  public newCategory = '';
  public newTopic = '';

  constructor(private categoriesService: CategoriesService,
              public authService: AuthService,
              private modalService: NgbModal) {
    this.categoriesService.getCategories()
      .subscribe((categories) => {
        this.categories = categories;
        this.categories.forEach(({_id}) => this.addingTopic[_id] = false);
      }, (error) => {
        console.log(error);
      });
  }

  saveCategory() {
    if (this.newCategory) {
      this.categoriesService.addCategorie(this.newCategory)
        .subscribe(category => {
          (category as any).categoryTopics = [{}];
          this.addingCategory = false;
          this.categories.push(category);
        });
    }

    this.newCategory = '';
  }

  saveTopic(category) {
    if (this.newTopic){
      this.categoriesService.addTopic(this.newTopic, category._id)
        .subscribe(topic => {
          this.addingTopic[category._id] = false;
          (topic as any).topicPosts = 0;

          if (category.categoryTopics[0].name) {
            category.categoryTopics.push(topic);
          } else {
            category.categoryTopics = [topic];
          }

          this.categories.forEach((element, index) => {
            if (element._id === category._id) {
                this.categories[index] = category;
            }
          });
        });
    }

    this.newTopic = '';
  }

  handleAddCategoryClicked(modalNotLoggedIn) {
    if (!this.authService.loggedIn) {
      this.modalService.open(modalNotLoggedIn, { centered: true });
    } else {
      this.addingCategory = true;
    }
  }

  handleAddTopicClicked(modalNotLoggedIn, categoryId) {
    if (!this.authService.loggedIn) {
      this.modalService.open(modalNotLoggedIn, { centered: true });
    } else {
      this.addingTopic[categoryId] = true;
    }
  }

  ngOnInit(): void {
  }
}
