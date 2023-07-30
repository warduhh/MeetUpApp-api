-- Users
INSERT INTO Users (firstName, lastName, email, password, location, phoneNumber, date_of_birth)
VALUES
    ('John', 'Doe', 'john.doe@example.com', 'password123', 'New York', '123-456-7890', '1990-05-15'),
    ('Jane', 'Smith', 'jane.smith@example.com', 'password456', 'San Francisco', '987-654-3210', '1985-10-22'),
    ('Michael', 'Johnson', 'michael.johnson@example.com', 'password789', 'Los Angeles', '555-555-5555', '1988-12-01'),
    ('Alice', 'Johnson', 'alice.johnson@example.com', 'password123', 'Seattle', '111-222-3333', '1992-04-12'),
    ('Bob', 'Williams', 'bob.williams@example.com', 'password456', 'Dallas', '444-555-6666', '1991-09-28'),
    ('Eva', 'Martinez', 'eva.martinez@example.com', 'password789', 'Miami', '777-888-9999', '1987-07-05');

-- Events
INSERT INTO Events (eventName, eventDescription, eventLocation, eventDate, organizerId)
VALUES
    ('Tech Conference', 'A conference for technology enthusiasts.', 'Chicago', '2023-08-10', 1),
    ('Hiking Adventure', 'Explore the beautiful mountains.', 'Denver', '2023-09-05', 2),
    ('Art Exhibition', 'An exhibition showcasing local artists.', 'San Francisco', '2023-07-20', 3),
    ('Coding Workshop', 'Learn to code with hands-on projects.', 'New York', '2023-08-20', 4),
    ('Nature Walk', 'Enjoy a peaceful walk in the park.', 'Los Angeles', '2023-09-15', 5),
    ('Live Music Night', 'An evening of live music and performances.', 'Chicago', '2023-07-25', 6);

-- Event Attendees
INSERT INTO EventAttendee (eventId, userId)
VALUES
    (1, 2),
    (1, 3),
    (2, 1),
    (3, 1),
    (3, 2),
    (4, 1),
    (4, 3),
    (5, 2),
    (6, 1),
    (6, 3);

-- Groups
INSERT INTO Groups (groupName, groupDescription, organizerId)
VALUES
    ('Tech Enthusiasts', 'A group for tech lovers.', 1),
    ('Hiking Club', 'For people who love outdoor adventures.', 2),
    ('Art Community', 'Connecting local artists.', 3),
    ('Coding Enthusiasts', 'A group for coding enthusiasts.', 4),
    ('Nature Lovers', 'For people who appreciate nature.', 5),
    ('Music Fans', 'Connecting music lovers.', 6);

-- Group Members
INSERT INTO GroupMembers (groupId, userId)
VALUES
    (1, 2),
    (1, 3),
    (2, 1),
    (3, 1),
    (3, 2),
    (4, 1),
    (4, 3),
    (5, 2),
    (6, 1),
    (6, 3);

-- User Interests
INSERT INTO UserInterests (userId, interest)
VALUES
    (1, 'Technology'),
    (1, 'Hiking'),
    (2, 'Hiking'),
    (2, 'Art'),
    (3, 'Art'),
    (4, 'Programming'),
    (4, 'Web Development'),
    (5, 'Hiking'),
    (5, 'Photography'),
    (6, 'Music'),
    (6, 'Dance');
