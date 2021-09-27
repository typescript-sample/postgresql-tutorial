CREATE TABLE users
(
    id character varying(40) NOT NULL,
    username character varying(120),
    email character varying(120),
    phone character varying(45),
    date_of_birth timestamp with time zone,
    interests character varying[],
    skills jsonb[],
    achievements jsonb[],
    settings jsonb,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)
-- đánh index
CREATE INDEX interests_index ON users (interests);
CREATE INDEX idx_skill ON users USING GIN (skills);

-- search varying[]
select * from users where interests && '{"Photography"}';

-- search jsonb
SELECT * FROM users WHERE settings @> '{"language":"Spanish"}';
select * from users where settings @> '{ "language": "France" }';

-- search jsonb[]
select * from users where '{"skill":"Java","hirable": true}' <@ ANY(skills) or '{"skill":"Nodejs"}' <@ ANY(skills);

-- search multiple fields
select * from users where interests && '{"Photography"}' and settings @> '{ "language": "France" }' and ('{ "subject": "test3", "description": "tesssssssssss" }' <@ ANY(achievements)) and ('{ "skill": "React", "hirable": true }' <@ ANY(skills) or '{"skill":"Nodejs"}' <@ ANY(skills));

insert into users (id, username, email, phone, date_of_birth, interests, skills, achievements, settings) values ('ironman', 'tony.stark', 'tony.stark@gmail.com', '0987654321', '1963-03-25', '{Photography,Football}', '{"{\"skill\": \"Java\", \"hirable\": true}"}', '{"{\"subject\": \"test3\", \"description\": \"tesssssssssss\"}"}', '{"language": "English", "dateFormat": "dd/mm/yyyy", "timeFormat": "hh:mm:ss", "notification": true, "dateTimeFormat": "dd-mm-yyyy:hh:mm"}');
insert into users (id, username, email, phone, date_of_birth, interests, skills, achievements, settings) values ('spiderman', 'peter.parker', 'peter.parker@gmail.com', '0987654321', '1962-08-25', '{Photography,Football}', '{"{"skill": "Nodejs", "hirable": false}"}', '{"{\"skill\": \"Java\", \"hirable\": true}"}', '{"{\"subject\": \"test\", \"description\": \"tesssssssssss\"}"}', '{"language": "Spanish", "dateFormat": "dd/mm/yyyy", "timeFormat": "hh:mm:ss", "notification": true, "dateTimeFormat": "dd-mm-yyyy:hh:mm"}');
insert into users (id, username, email, phone, date_of_birth, interests, skills, achievements, settings) values ('wolverine', 'james.howlett', 'james.howlett@gmail.com', '0987654321', '1974-11-16', '{Basketball,Football}', '{"{\"skill\": \"React\", \"hirable\": true}"}', '{"{\"subject\": \"test3\", \"description\": \"tesssssssssss\"}"}', '{"language": "France","dateFormat": "dd/mm/yyyy","timeFormat": "hh:mm:ss","notification": true,"dateTimeFormat": "dd-mm-yyyy:hh:mm"}');
insert into users (id, username, email, phone, date_of_birth, interests, skills, achievements, settings) values ('ironman1', 'tony.stark', 'tony.stark@gmail.com', '0987654321', '1963-03-25', '{Photography,Football}', '{"{\"skill\": \"Angular\", \"hirable\": false}"}', '{"{\"subject\": \"test4\", \"description\": \"tesssssssssss\"}"}', '{"language": "Spanish","dateFormat": "dd/mm/yyyy","timeFormat": "hh:mm:ss","notification": true,"dateTimeFormat": "dd-mm-yyyy:hh:mm"}');
insert into users (id, username, email, phone, date_of_birth, interests, skills, achievements, settings) values ('spiderman1', 'peter.parker', 'peter.parker@gmail.com', '0987654321', '1962-08-25', '{Photography,Football}', '{"{\"skill\": \"Nodejs\", \"hirable\": false}"}', '{"{\"subject\": \"test2\", \"description\": \"tesssssssssss\"}"}', '{"language": "Spanish","dateFormat": "dd/mm/yyyy","timeFormat": "hh:mm:ss","notification": true,"dateTimeFormat": "dd-mm-yyyy:hh:mm"}');
insert into users (id, username, email, phone, date_of_birth, interests, skills, achievements, settings) values ('wolverine1', 'james.howlett', 'james.howlett@gmail.com', '0987654321', '1974-11-16', '{Basketball,Playgame}', '{"{\"skill\": \"Nodejs\", \"hirable\": false}","{\"skill\": \"React\", \"hirable\": false}"}','{"{\"subject\": \"test2\", \"description\": \"tesssssssssss\"}"}', '{"language": "Spanish","dateFormat": "dd/mm/yyyy","timeFormat": "hh:mm:ss","notification": true,"dateTimeFormat": "dd-mm-yyyy:hh:mm"}');

