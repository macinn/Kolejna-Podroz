INSERT INTO `m1533_kp-db`.Connection2
(FromId, DestinationId, DepartureTime, ArrivalTime, ProviderId, Points, Price)
SELECT 
-- COUNT(*)
	FromId
    , DestinationId
    , DepartureTime + INTERVAL SEQ.Offset DAY AS DepartureTime
    , ArrivalTime + INTERVAL SEQ.Offset DAY AS ArrivalTime
    , ProviderId
    , Points
    , Price
FROM `m1533_kp-db`.Connections
CROSS JOIN (SELECT @row := @row + 1 AS `Offset` FROM 
	(select 0 union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) t,
	(select 0 union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) t2, 
	(select 0 union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) t3, 
	(select 0 union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) t4, 
	(SELECT @row:=0) numbers) AS SEQ
;

INSERT INTO `m1533_kp-db`.Connections
	(FromId, DestinationId, DepartureTime, ArrivalTime, ProviderId, Points, Price)
SELECT
	FromId, DestinationId, DepartureTime, ArrivalTime, ProviderId, Points, Price
FROM 
	`m1533_kp-db`.Connection2
;

DELETE FROM `m1533_kp-db`.Connection2
;
