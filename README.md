# PizzaAppTask-2  
Who pays for pizza?  


The party is about to start and we realized that our mama can't make such a big pizza for such a big crowd of people. So, we decided to order pizza from Dominos! We know how many of our guests will eat pizza, but we totally forgot that there are vegans among them. Also, we need to calculate how much each of the guests should pay and we need to show a table with guests to track who paid for party pizza and who did not. 
When a guest pays his share, we need to recalculate how much money we still need to collect. More details on that later.  


How PizzaPayApp should look and work?
  
  
  As in the previous task we start with an empty page, only "Load" button appears. When clicking on it, the next things happen:
  
  
1. we show "loading" text while all requests are finished and we can show the end result (Total table)
2. request for party guests
3. request for party guests diets
4. when responses for 2 and 3 arrive, send a request for pizza order and currency exchange. Important: pizza ordering and currency requests should be fired in parallel to save time. If more than 51% of guests are vegans, order "vegan" or "cheese" type of pizza (pick it randomly), else order "meat" pizza. The number of slices remains equal to the number of "pizza eaters", we'll cut a slice of meat pizza for vegan as well. 
5. when 4 is done (pizza was ordered and currency exchange rates are known) show PizzaSlice and Total table
6. when clicking on "PAY" button, zero guest share, add his share to "collected" amount, subtract his share from "Money to collect" amount, disable the button and change text to "PAID"
7. If user is vegan - draw his name with green color
8. Remember to round the prices - only 1 digit of the fraction is allowed. 
