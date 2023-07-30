DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Events CASCADE;
DROP TABLE IF EXISTS EventAttendee CASCADE;
DROP TABLE IF EXISTS Groups CASCADE;
DROP TABLE IF EXISTS GroupMembers CASCADE;
DROP TABLE IF EXISTS UserInterests CASCADE;


CREATE TABLE Users (
    userId SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL, 
    location VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    phoneNumber VARCHAR(255),
    date_of_birth DATE
);

CREATE TABLE Events (
    eventId SERIAL PRIMARY KEY,
    eventName VARCHAR(255) NOT NULL,
    eventDescription TEXT,
    eventLocation VARCHAR(255),
    eventDate TIMESTAMP,
    organizerId INT REFERENCES Users(userId)
);

CREATE TABLE EventAttendee (
    eventAttendeeId SERIAL PRIMARY KEY,
    eventId INT REFERENCES Events(eventId),
    userId INT REFERENCES Users(userId)
);

CREATE TABLE Groups (
    groupId SERIAL PRIMARY KEY,
    groupName VARCHAR(255) NOT NULL,
    groupDescription TEXT,
    organizerId INT REFERENCES Users(userId),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE GroupMembers (
    groupMemberId SERIAL PRIMARY KEY,
    groupId INT REFERENCES Groups(groupId),
    userId INT REFERENCES Users(userId)
);

CREATE TABLE UserInterests (
    interestId SERIAL PRIMARY KEY,
    userId INT REFERENCES Users(userId),
    interest VARCHAR(255)
);