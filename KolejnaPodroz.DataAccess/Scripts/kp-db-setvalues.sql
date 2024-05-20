UPDATE `m1533_kp-db`.`Connections`
SET Points =  ABS(FromId-DestinationId)*35 + FLOOR(RAND()*20)
WHERE 1 = 1
;
UPDATE `m1533_kp-db`.`Connections`
SET Price = ABS(FromId-DestinationId)*20 + RAND()*10
WHERE 1 = 1
;
UPDATE `m1533_kp-db`.`Connections`
SET ArrivalTime = DepartureTime + INTERVAL ABS(FromId - DestinationId)*20 MINUTE
WHERE 1 = 1
;
