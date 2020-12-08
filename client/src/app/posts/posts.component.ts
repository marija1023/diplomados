import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faUser, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  faUser = faUser;
  faHeart = faHeart;
  faPlus = faPlus;
  faTrash = faTrash;

  public posts;
  public addingPost = false;
  public postToAdd = '';

  public selectedSort: string;
  public likesSort = false;

  constructor(private postService: PostsService,
              public authService: AuthService,
              private route: ActivatedRoute,
              private modalService: NgbModal) {
    const topicId = this.route.snapshot.params.topicId;
    this.postService.getPosts(topicId)
    .subscribe((posts) => {
      this.posts = posts;
    }, (error) => {
      console.log(error);
    });
  }

  handleAddPostClicked(modalNotLoggedIn) {
    if (!this.authService.loggedIn) {
      this.modalService.open(modalNotLoggedIn, { centered: true });
    } else {
      this.addingPost = true;
    }
  }

  addPost() {
    const topicId = this.route.snapshot.params.topicId;
    this.postService.addPost(this.authService.username, topicId, this.postToAdd)
      .subscribe(post => {
        this.posts.push(post);
      });

    this.postToAdd = '';
    this.addingPost = false;
  }

  deletePost(postId) {
    this.postService.deletePost(postId)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post._id !== postId);
      });
  }

  isUserLikedPost(post) {
    const foundLike = post.likes.find(username => username === this.authService.username);
    return foundLike ? true : false;
  }

  likePost(post) {
    this.postService.likePost(post._id, this.authService.username)
      .subscribe(() => {
        post.likes.push(this.authService.username);
      });
  }

  unlikePost(post) {
    this.postService.unlikePost(post._id, this.authService.username)
      .subscribe(() => {
        const foundIndexOfLike = post.likes.findIndex(username => username === this.authService.username);
        post.likes.splice(foundIndexOfLike, 1);
      });
  }

  onSortByDateCliked() {
    this.likesSort = false;
    this.selectedSort = 'Date';
  }

  onSortByLikesCliked() {
    this.likesSort = true;
    this.selectedSort = 'Likes';
  }

  ngOnInit(): void {
  }
}
