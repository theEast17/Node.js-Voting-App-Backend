what is voting application?
-A functionality where user can give vote to their desired candidates

functionality-
1. signin/signup
2. see the list of candidates
3. only single time voting after then it would be disabled 
4. live vote count for each candidates
5. user must have unique id called Adhar id
6. there should be candidate who able to maintain the records but can   not able to vote
7. user can change the password


routes-
user authentication-
1. /signup - POST  (create a new user)
2. /signin - POST  (log into the existing account)

voting-
1. /candidates - GET  (get all the candidates details)
2. /vote/:candidateId - POST (vote for specific candidate)

vote counts-
1. /vote/counts - GET - get the total count for each candidates

user profile-
1. /profile - GET - get the user profile
2. /profile/password - PUT - chnage the password

admin-
1. /candidates  -  POST - create new candidate
2. /candidates/:candidateId - PUT - update candidate
3. /candidates/:candidateId - DELETE - delete candidate