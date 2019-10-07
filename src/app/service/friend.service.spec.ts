import { TestBed} from '@angular/core/testing';
import { FriendService } from './friend.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FriendService', () => {
  // We declare the variables that we'll use for the Test Controller and for our Service
  let httpTestingController: HttpTestingController;
  let service: FriendService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FriendService],
      imports: [HttpClientTestingModule]
    });

    // Injecting Service and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(FriendService);
  });


  // Angular default test
    it('should be created', () => {
    expect(service).toBeTruthy();
  });


});