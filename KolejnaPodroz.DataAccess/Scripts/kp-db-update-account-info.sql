UPDATE `m1533_kp-db`.AccountInfo ai
SET TicketsBought = ( 
	SELECT Count(*) FROM `m1533_kp-db`.Tickets t
	WHERE t.UserId = ai.Id)
, LoyaltyPoints = ( 
	SELECT SUM(c.Points) FROM `m1533_kp-db`.Tickets t
    JOIN `m1533_kp-db`.Connections c 
    ON c.Id = t.ConnectionId
	WHERE t.UserId = ai.Id)
, TravelTime = ( 
	SELECT SUM(TIMESTAMPDIFF(MINUTE, c.DepartureTime, c.ArrivalTime)) 
    FROM `m1533_kp-db`.Tickets t
    JOIN `m1533_kp-db`.Connections c 
    ON c.Id = t.ConnectionId
	WHERE t.UserId = ai.Id)
;
SELECT * FROM `m1533_kp-db`.AccountInfo	