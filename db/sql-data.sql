-- Table: Workshop Categories
CREATE TABLE WorkshopCategories (
                                    CategoryID SERIAL PRIMARY KEY,           -- Auto-incrementing ID
                                    CategoryName VARCHAR(50) NOT NULL UNIQUE, -- e.g., 'Erwachsenen', 'Kinder2', 'Kinder4', 'Kinder6'
                                    Price DECIMAL(10, 2) NOT NULL,  -- Price for the workshop
                                    AppointmentCount INT NOT NULL            -- Fixed number of appointments
);

-- Table: Workshops
CREATE TABLE Workshops (
                           WorkshopID SERIAL PRIMARY KEY,           -- Auto-incrementing ID
                           Title VARCHAR(100) NOT NULL,             -- Title of the workshop
                           Description TEXT,                        -- Detailed description
                           CategoryID INT NOT NULL,                 -- Links to WorkshopCategories
                           MaxParticipants INT NOT NULL,           -- Maximum number of participants
                           CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           FOREIGN KEY (CategoryID) REFERENCES WorkshopCategories(CategoryID) ON DELETE CASCADE
);

-- Table: Appointments
CREATE TABLE Appointments (
                              AppointmentID SERIAL PRIMARY KEY,        -- Auto-incrementing ID
                              WorkshopID INT NOT NULL,                 -- Links to the Workshops table
                              AppointmentDate TIMESTAMP NOT NULL,      -- Date and time of the appointment
                              Duration INT NOT NULL,         -- Duration of the appointment in minutes
                              FOREIGN KEY (WorkshopID) REFERENCES Workshops(WorkshopID) ON DELETE CASCADE
);

-- Table: Participants
CREATE TABLE Participants (
                              ParticipantID SERIAL PRIMARY KEY,        -- Auto-incrementing ID
                              FullName VARCHAR(100) NOT NULL,          -- Full name of the participant
                              Email VARCHAR(100) NOT NULL UNIQUE,      -- Email for contact and notifications
                              IsChild BOOLEAN NOT NULL DEFAULT FALSE,  -- Indicates if the participant is a child
                              CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Registrations
CREATE TABLE Registrations (
                               RegistrationID SERIAL PRIMARY KEY,       -- Auto-incrementing ID
                               ParticipantID INT NOT NULL,              -- Links to the Participants table
                               WorkshopID INT NOT NULL,                 -- Links to the Workshops table
                               RegisteredAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               SlotCount INT NOT NULL DEFAULT 1,                 -- Number of slots reserved
                               FOREIGN KEY (ParticipantID) REFERENCES Participants(ParticipantID) ON DELETE CASCADE,
                               FOREIGN KEY (WorkshopID) REFERENCES Workshops(WorkshopID) ON DELETE CASCADE
);

CREATE TABLE PayPalOrders (
                              PayPalOrderID VARCHAR(255) PRIMARY KEY,   -- The unique ID from PayPal
                              ParticipantID INT NOT NULL,              -- Reference to the Participants table
                              OrderStatus VARCHAR(50) NOT NULL,       -- Status of the order (e.g., 'COMPLETED', 'PENDING')
                              CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the order was created
                              FOREIGN KEY (ParticipantID) REFERENCES Participants(ParticipantID) ON DELETE CASCADE
);

CREATE TABLE Users (
                        id TEXT unique,
                        providerid VARCHAR(255) PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL,
                        isadmin BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE TABLE user_session (
                              id TEXT PRIMARY KEY,
                              expires_at TIMESTAMPTZ NOT NULL,
                              user_id TEXT NOT NULL REFERENCES Users(id)
);

INSERT INTO WorkshopCategories (CategoryName, AppointmentCount, Price)
VALUES
    ('Erwachsenen', 2, 75.00),
    ('Kinder2', 2, 60.00),
    ('Kinder4', 4, 105.00),
    ('Kinder6', 6, 130.00);

INSERT INTO Workshops (Title, Description, CategoryID, MaxParticipants)
VALUES ('Erwachsenen - Workshop (Februar-März)', 'Lorem ipsum', 1, 10);

INSERT INTO Appointments (WorkshopID, Duration, AppointmentDate)
VALUES
    (1, 150, '2025-01-09 17:00:00'),
    (1, 150, '2025-01-30 17:00:00');