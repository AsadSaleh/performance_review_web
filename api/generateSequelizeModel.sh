npx sequelize-cli model:generate --name User --attributes name:string,email:string,city:string,department:string
npx sequelize-cli model:generate --name PerformanceReview --attributes UserId:integer,ReviewerId:integer,status:string
npx sequelize-cli model:generate --name PerformanceReviewAnswer --attributes PerformanceReviewId:integer,QuestionId:integer,ChoiceId:integer
npx sequelize-cli model:generate --name Question --attributes text:string
npx sequelize-cli model:generate --name Choice --attributes text:string,value:integer
npx sequelize-cli model:generate --name QuestionChoice --attributes QuestionId:integer,ChoiceId:integer