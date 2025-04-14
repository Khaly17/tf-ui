import { TestBed } from '@angular/core/testing';

import { ItemNotificationService } from './item-notification.service';

describe('ItemNotificationService', () => {
  let service: ItemNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
