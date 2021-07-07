# Model Relationships

Models = Database Tables

## Types of Model Relations

1. One To One

   One `Bakery` has one `Cookie`. One `Cookie` has one `Bakery`.

   Example: `Citizen` and `CivilID`.

2. One To Many (Many To One)

   One `Bakery` has many `Cookies`. OR one `Cookie` has many `Bakeries`.

   Example: One `Bakery` has many `Cookies`

   Creates a `bakeryId` field in the `Cookie` table. This field is called a `Foreign Key`.

3. Many To Many

   A `Bakery` has many `Cookies`, AND each `Cookie` has many `Bakeries`.

   Example: Facebook user profiles

---

1. Create Bakery model
2. Create Bakery routes and controllers (list and create)
3. Model relationship between Bakery and Cookie
4. Move Cookie create route & controller to Bakery's routes and controllers files
5. Customized JSON response for Bakery list and Cookie list.
