INSERT INTO bills 
  (payee_id, user_id, amount, due_date, reminder_date, paid_date, note)
VALUES 
  (1, 1, 56.50, '2023-07-30', '2023-07-25', NULL, 'Phone July'),
  (1, 1, 90.39, '2023-07-20', '2023-07-15', NULL, 'Internet July'),
  (13, 1, 23.72, '2023-07-01', '2023-06-29', NULL, 'Netflix July'),
  (7, 1, 2241.83, '2023-07-11', '2023-07-01', NULL, 'Visa July'),
  (11, 1, 481.22, '2023-07-01', '2023-06-25', NULL, 'Property Tax July'),
  (12, 1, 302.73, '2023-07-02', '2023-06-29', NULL, 'Auto Insurance July'),
  (18, 1, 4.51, '2023-07-14', '2023-07-10', NULL, 'iCloud July'),

  (1, 1, 56.50, '2023-06-30', '2023-06-25', NULL, 'Phone June'),
  (1, 1, 90.39, '2023-06-20', '2023-06-15', NULL, 'Internet June'),
  (13, 1, 23.72, '2023-06-01', '2023-05-29', '2023-05-30', 'Netflix June'),
  (7, 1, 670.05, '2023-06-11', '2023-06-01', NULL, 'Visa June'),
  (10, 1, 150.44, '2023-06-20', '2023-06-15', '2023-06-15', 'Electric June'),
  (22, 1, 2200.00, '2023-06-01', '2023-05-15', '2023-05-15', 'Rent June'),
  (12, 1, 302.73, '2023-06-02', '2023-05-29', '2023-05-30', 'Auto Insurance June'),
  (18, 1, 4.51, '2023-06-14', '2023-06-10', NULL, 'iCloud June'),

  (1, 1, 56.50, '2023-05-30', '2023-05-25', '2023-05-26', 'Phone May'),
  (1, 1, 90.39, '2023-05-20', '2023-05-15', '2023-05-15', 'Internet May'),
  (13, 1, 23.72, '2023-05-01', '2023-04-29', '2023-04-29', 'Netflix May'),
  (7, 1, 801.22, '2023-05-11', '2023-05-01', '2023-05-01', 'Visa May'),
  (10, 1, 122.38, '2023-05-20', '2023-05-15', '2023-05-16', 'Electric May'),
  (22, 1, 2200.00, '2023-05-01', '2023-04-15', '2023-04-25', 'Rent May'),
  (12, 1, 302.73, '2023-05-02', '2023-04-29', '2023-04-30', 'Auto Insurance May'),
  (18, 1, 4.51, '2023-05-14', '2023-05-10', '2023-05-11', 'iCloud May'),

  (1, 1, 56.50, '2023-04-30', '2023-04-25', '2023-04-27', 'Phone April'),
  (1, 1, 90.39, '2023-04-20', '2023-04-15', '2023-04-17', 'Internet April'),
  (13, 1, 23.72, '2023-04-01', '2023-03-29', '2023-03-29', 'Netflix April'),
  (7, 1, 790.54, '2023-04-11', '2023-04-01', '2023-04-01', 'Visa April'),
  (10, 1, 120.71, '2023-04-20', '2023-04-15', '2023-04-15', 'Electric April'),
  (22, 1, 2200.00, '2023-04-01', '2023-03-15', '2023-03-25', 'Rent April'),
  (12, 1, 302.73, '2023-04-02', '2023-03-29', '2023-03-30', 'Auto Insurance April'),
  (18, 1, 4.51, '2023-04-14', '2023-04-10', '2023-04-11', 'iCloud April'),

  
  (1, 1, 61.70, '2023-03-30', '2023-03-25', '2023-03-27', 'Phone March'),
  (1, 1, 90.39, '2023-03-20', '2023-03-15', '2023-03-17', 'Internet March'),
  (13, 1, 23.72, '2023-03-01', '2023-02-28', '2023-02-28', 'Netflix March'),
  (7, 1, 1110.89, '2023-03-11', '2023-03-01', '2023-03-01', 'Visa March'),
  (10, 1, 118.17, '2023-03-20', '2023-03-15', '2023-03-15', 'Electric March'),
  (22, 1, 2200.00, '2023-03-01', '2023-02-15', '2023-02-25', 'Rent March'),
  (12, 1, 302.73, '2023-03-02', '2023-02-28', '2023-02-28', 'Auto Insurance March'),
  (18, 1, 4.51, '2023-03-14', '2023-03-10', '2023-03-11', 'iCloud March'),

  (1, 1, 61.70, '2023-02-28', '2023-02-25', '2023-02-26', 'Phone Febrary'),
  (1, 1, 90.39, '2023-02-20', '2023-02-15', '2023-02-17', 'Internet Febrary'),
  (13, 1, 23.72, '2023-02-01', '2023-01-29', '2023-01-28', 'Netflix Febrary'),
  (7, 1, 998.12, '2023-02-11', '2023-02-01', '2023-02-01', 'Visa Febrary'),
  (10, 1, 106.27, '2023-02-20', '2023-02-15', '2023-02-15', 'Electric Febrary'),
  (22, 1, 2200.00, '2023-02-01', '2023-01-15', '2023-01-25', 'Rent Febrary'),
  (12, 1, 301.73, '2023-02-01', '2023-01-29', '2023-01-28', 'Auto Insurance Febrary'),
  (18, 1, 4.51, '2023-02-14', '2023-02-10', '2023-02-11', 'iCloud Febrary'),

  (1, 1, 61.70, '2023-01-30', '2023-01-25', '2023-01-27', 'Phone January'),
  (1, 1, 90.39, '2023-01-20', '2023-01-15', '2023-01-17', 'Internet January'),
  (13, 1, 23.72, '2023-01-01', '2023-01-29', '2022-12-29', 'Netflix January'),
  (7, 1, 898.98, '2023-01-11', '2023-01-01', '2023-01-01', 'Visa January'),
  (10, 1, 100.27, '2023-01-20', '2023-01-15', '2023-01-15', 'Electric January'),
  (22, 1, 2200.00, '2023-01-02', '2023-01-15', '2022-12-25', 'Rent January'),
  (12, 1, 301.73, '2023-01-01', '2023-01-29', '2022-12-30', 'Auto Insurance January'),
  (18, 1, 4.51, '2023-01-14', '2023-01-10', '2023-01-11', 'iCloud January'),

  (1, 1, 61.70, '2022-12-30', '2022-12-25', '2022-12-27', 'Phone December'),
  (1, 1, 82.58, '2022-12-20', '2022-12-15', '2022-12-17', 'Internet December'),
  (13, 1, 21.52, '2022-12-01', '2022-12-29', '2022-11-29', 'Netflix December'),
  (7, 1, 821.21, '2022-12-11', '2022-12-01', '2022-12-01', 'Visa December'),
  (10, 1, 102.12, '2022-12-20', '2022-12-15', '2022-12-15', 'Electric December'),
  (22, 1, 2000.00, '2022-12-02', '2022-12-15', '2022-11-25', 'Rent December'),
  (12, 1, 285.83, '2022-12-01', '2022-12-29', '2022-11-30', 'Auto Insurance December'),
  (18, 1, 4.51, '2022-12-14', '2022-12-10', '2022-12-11', 'iCloud December'),

  (1, 1, 61.70, '2022-11-30', '2022-11-25', '2022-11-27', 'Phone November'),
  (1, 1, 82.58, '2022-11-20', '2022-11-15', '2022-11-17', 'Internet November'),
  (13, 1, 21.52, '2022-11-01', '2022-11-29', '2022-10-29', 'Netflix November'),
  (7, 1, 787.34, '2022-11-11', '2022-11-01', '2022-11-01', 'Visa November'),
  (10, 1, 98.23, '2022-11-20', '2022-11-15', '2022-11-15', 'Electric November'),
  (22, 1, 2000.00, '2022-11-02', '2022-11-15', '2022-10-25', 'Rent November'),
  (12, 1, 285.83, '2022-11-01', '2022-11-29', '2022-10-30', 'Auto Insurance November'),
  (18, 1, 4.51, '2022-11-14', '2022-11-10', '2022-11-11', 'iCloud November'),

  (1, 1, 61.70, '2022-10-30', '2022-10-25', '2022-10-27', 'Phone October'),
  (1, 1, 82.58, '2022-10-20', '2022-10-15', '2022-10-17', 'Internet October'),
  (13, 1, 21.52, '2022-10-01', '2022-10-29', '2022-09-29', 'Netflix October'),
  (7, 1, 887.98, '2022-10-11', '2022-10-01', '2022-10-01', 'Visa October'),
  (10, 1, 101.67, '2022-10-20', '2022-10-15', '2022-10-15', 'Electric October'),
  (22, 1, 2000.00, '2022-10-02', '2022-10-15', '2022-09-25', 'Rent October'),
  (12, 1, 285.83, '2022-10-01', '2022-10-29', '2022-09-30', 'Auto Insurance October'),
  (18, 1, 4.51, '2022-10-14', '2022-10-10', '2022-10-11', 'iCloud October'),

  (1, 1, 61.70, '2022-09-30', '2022-09-25', '2022-09-27', 'Phone September'),
  (1, 1, 82.58, '2022-09-20', '2022-09-15', '2022-09-17', 'Internet September'),
  (13, 1, 21.52, '2022-09-01', '2022-09-29', '2022-08-29', 'Netflix September'),
  (7, 1, 921.51, '2022-09-11', '2022-09-01', '2022-09-01', 'Visa September'),
  (10, 1, 91.12, '2022-09-20', '2022-09-15', '2022-09-15', 'Electric September'),
  (22, 1, 2000.00, '2022-09-02', '2022-09-15', '2022-08-25', 'Rent September'),
  (12, 1, 285.83, '2022-09-01', '2022-09-29', '2022-08-30', 'Auto Insurance September'),
  (18, 1, 4.51, '2022-09-14', '2022-09-10', '2022-09-11', 'iCloud September'),

  (1, 1, 61.70, '2022-08-30', '2022-08-25', '2022-08-27', 'Phone August'),
  (1, 1, 82.58, '2022-08-20', '2022-08-15', '2022-08-17', 'Internet August'),
  (13, 1, 21.52, '2022-08-01', '2022-08-29', '2022-07-29', 'Netflix August'),
  (7, 1, 1002.29, '2022-08-11', '2022-08-01', '2022-08-01', 'Visa August'),
  (10, 1, 95.72, '2022-08-20', '2022-08-15', '2022-08-15', 'Electric August'),
  (22, 1, 2000.00, '2022-08-02', '2022-08-15', '2022-07-25', 'Rent August'),
  (12, 1, 285.83, '2022-08-01', '2022-08-29', '2022-07-30', 'Auto Insurance August'),
  (18, 1, 4.51, '2022-08-14', '2022-08-10', '2022-08-11', 'iCloud August'),

  (1, 1, 61.70, '2022-07-30', '2022-07-25', '2022-07-27', 'Phone July'),
  (1, 1, 82.58, '2022-07-20', '2022-07-15', '2022-07-17', 'Internet July'),
  (13, 1, 21.52, '2022-07-01', '2022-07-29', '2022-06-29', 'Netflix July'),
  (7, 1, 965.11, '2022-07-11', '2022-07-01', '2022-07-01', 'Visa July'),
  (10, 1, 89.89, '2022-07-20', '2022-07-15', '2022-07-15', 'Electric July'),
  (22, 1, 2000.00, '2022-07-02', '2022-07-15', '2022-06-25', 'Rent July'),
  (12, 1, 285.83, '2022-07-01', '2022-07-29', '2022-06-30', 'Auto Insurance July'),
  (18, 1, 4.51, '2022-07-14', '2022-07-10', '2022-07-11', 'iCloud July'),

  (1, 1, 61.70, '2022-06-30', '2022-06-25', '2022-06-27', 'Phone June'),
  (1, 1, 82.58, '2022-06-20', '2022-06-15', '2022-06-17', 'Internet June'),
  (13, 1, 21.52, '2022-06-01', '2022-06-29', '2022-05-29', 'Netflix June'),
  (7, 1, 977.11, '2022-06-11', '2022-06-01', '2022-06-01', 'Visa June'),
  (10, 1, 82.45, '2022-06-20', '2022-06-15', '2022-06-15', 'Electric June'),
  (22, 1, 2000.00, '2022-06-02', '2022-06-15', '2022-05-25', 'Rent June'),
  (12, 1, 285.83, '2022-06-01', '2022-06-29', '2022-05-30', 'Auto Insurance June'),
  (18, 1, 4.51, '2022-06-14', '2022-06-10', '2022-06-11', 'iCloud June');