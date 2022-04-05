# Exercise-1

## Question-1: What columns violate 1NF?

### Answer-1:

> 1NF Rules:

1. All data must be atomic (every column should only contain a single value)
2. Repeating columns are not allowed
3. Prevent duplicate records (by applying primary keys)
4. Attribute domain should not change (all values in a column must be of the same kind or type).

> Columns of the Table:

1. member_id: Violates rule 3 because of same ids
2. member_address: Violates rule 1 because it has house number and street name together
3. dinner_date: Violates rule 4 because date formats are different
4. food_code: Violates rule 1 because it contains many values
5. food_description: Violates rule 1 because it contains many values

## Question-2: What entities do you recognize that could be extracted?

### Answer-2:

`Dinner`, `Venue`, and `Food` entities could be extracted as a separated table.

##  Question-3: Name all the tables and columns that would make a 3NF compliant solution.

### Answer-3:

> Members

member_id (PK) | member_name | member_address 
--- | --- | ---

> Dinners

dinner_id (PK) | dinner_date | member_id (FK) 
--- | --- | ---

> Venues

venue_code (PK) | venue_description | dinner_id (FK) 
--- | --- | ---

> Foods

food_code (PK) | food_description | dinner_id (FK) 
--- | --- | ---