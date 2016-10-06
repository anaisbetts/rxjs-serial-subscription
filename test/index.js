import './support';

import {Subscription} from 'rxjs';
import SerialSubscription from '../src/index';

describe('SerialSubscription', function() {
  beforeEach(function() {
    this.fixture = new SerialSubscription();
  });
  
  it('should dispose new items when you add them', function() {
    let d1Dead = false;
    let d1 = new Subscription(() => d1Dead = true);
    
    // Subscriptions can also be just Functions
    let d2Dead = false;
    let d2 = () => d2Dead = true;
    
    expect(d1Dead).not.to.be.ok;
    expect(d2Dead).not.to.be.ok;
    
    this.fixture.add(d1);
    
    expect(d1Dead).not.to.be.ok;
    expect(d2Dead).not.to.be.ok;
    
    this.fixture.add(d2);
    
    expect(d1Dead).to.be.ok;
    expect(d2Dead).not.to.be.ok;
    
    this.fixture.add(Subscription.EMPTY);
    
    expect(d1Dead).to.be.ok;
    expect(d2Dead).to.be.ok;
  });
  
  it('should dispose when you call unsubscribe', function() {
    let d1Dead = false;
    let d1 = new Subscription(() => d1Dead = true);
    
    let d2Dead = false;
    let d2 = new Subscription(() => d2Dead = true);  
      
    expect(d1Dead).not.to.be.ok;
    expect(d2Dead).not.to.be.ok;
    
    this.fixture.add(d1);
    this.fixture.unsubscribe();
          
    expect(d1Dead).to.be.ok;
    expect(d2Dead).not.to.be.ok;
    
    // This should do nothing, we're already unsubscribed
    this.fixture.add(d2);
            
    expect(d1Dead).to.be.ok;
    expect(d2Dead).not.to.be.ok;
      
    // This should do nothing, we're already unsubscribed
    this.fixture.unsubscribe();
                
    expect(d1Dead).to.be.ok;
    expect(d2Dead).not.to.be.ok;
  });
});
