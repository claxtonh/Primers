## Terminology
# Univerariate means there's only one variable (aka feature)
# X is usually the independent variable and is often capitalized to denote such

## Typical dependencies
from sklearn.datasets import make_regression # imports the library needed to make a data sample


## How to create a random dataset
from sklearn.datasets import make_regression # imports the library needed to make a data sample
X, y = make_regression(n_samples = 20, n_features=1, random_state=0, noise=4, bias=100.0)
    # X and y are the two variables.  Because X is capitalized, it is probably the Independent variable
    #n_sample is how many samples will be created in this dataset
    #n_features is the number of dependent variables.  (X is an independent variable and is not counted)
    # random_state is like random, but it seeds a number so that you can create the same dataset in the future.  This is useful in academia where you need the exact same dataset to ensure reproducibility
    #noise determines how far from the points will be from the line.  The higher the noise, the further from the line the dots will be (aka variance)
    #bias is where the Y-intercept will be (at x= 0)
plt.scatter(X,y) # is a good way to visualize youre dataset before usage.


## how to make an S-Curve dataset
from sklearn.datasets import make_s_curve
data, color = make_s_curve(100, random_state=0)
plt.scatter(data[:,0], color) # To see the data


## How to make a LinearRegression model against data
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X, y)  ## once we assign the Linear Regression function to the variable, we use it to fit the data
    # You can view variable associated with the fit.  Note the _ in the suffix.  That means it's only available after the model has been fit to the data
print('Weight coefficients: ', model.coef_)   # The Weight coefficients comes back as an array, because you can have many weights.  think y = mx + nz + b where m & n are the coeficients
print('y-axis intercept:', model.intercept_)  # this is the b in the equation y=mx+b
print(X.min()) # prints the minimum value in the data
print(X.max()) # prints the maximum value in the data

## Making predictions from a LinearRegression model
predictions = model.predict(X)
    ## The following prints only the first value predicted, and compares it against what it actually was.
print(f"True output: {y[0]}")
print(f"Predicted output: {predictions[0]}")
print(f"Prediction Error: {predictions[0]-y[0]}")
    ## working with the rest of the data.  you can insert a value in the model.predict to spit out what the predicted value would be in the linear regression
    ## However, X.min and X.max must be in array format.
    ## If they are not in array format, you can use the following commands to put them into array format
x_min = numpy.array([[X.min()]])
x_max = numpy.array([[X.max()]])
y_min_predicted = model.predict(x.min())   
y_max_predicted = model.predict(x.max())

    ## To plot this data
plt.scatter(X, y)
plt.plot([x_min, x_max], [y_min, y_max]) # To draw the line between two points



## Putting those predictions in a Panda dataframe
pd.DataFrame({"Predicted": predictions, "Actual": y, "Error": predictions - y})[["Predicted", "Actual", "Error"]]



## Getting data out of a Panda Dataframe to be used by SciKit Learn
    #Sklearn requires data to be in a two-dimensional array of values.  Think Columns, not a series.
    #assume this type of data in a panda dataframe
    ColumnA    ColumnB    ColumnC
    0           3           9
    15          6           18
    30          9           81
    35          12          144
    
    #the commands
    y = array["columnA"].values
    print(y)
    #returns a series [ 0  15  30  35 ] which sklearn can't use.
    #instead you need to reshape the data into an array
    y = array["ColumnA"].values.reshape(-1, 1)  # The -1 means you don't know how many rows there will be
    print(y)
    #returns
    [[0] [15] [30] [35]] # Which is a list of lists (an array)
    
    #If you have a multivariate group  you don't need to reshape the data
     X = array[["ColumnB", "ColumnC"]]  # This puts the data in an array 4 x 2 
    #To see the shape of the arrays
    print(X.shape, y.shape)


## Measuring how well a model fits the data
from sklearn.metrics import mean_squared_error, r2_score
predicted = model.predict(X)
mse = mean_squared_error(y, predicted) #a good mse is close to 0
r2 = r2_scrore(y, predicted) # a good R2 score is close to 1, and is generally the default
model.score(X, y) # is the R2 score for full model


## Creating testing and training data
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state = 42)


## Multiple Linear Regression
from sklearn.datasets import make_regression
X, y = make_regression(n_samples=30, n_features=3, n_informative=3, random_state=42, noise = 0.5, bias = 100)
    # To visualize on a 3 D plot
from mpl_toolkits.mplot3d import Axes3D
fig = plt.figure(1, figsize=(5,5))
axes = Axes3D(fig, elev=20, azim=45)
axes.scatter(X[:,0], X[:,1], X[:,2], c=y, cmap=plt.cm.get_cmap("Spectra"))
plt.show
    # Can still fit model as normal (The Linear Regression model in sklearn uses the Ordinary Least Squares method)
model = LinearRegression()
model.fit(X, y)  # to fit against the 3D dataset.


##To plot residuals
predictions = model.predict(X)
plt.scatter(predictions, predictions - y)
plt.hlines(y=0, xmin=predictions.min(), xmax=predictions.max())
plt.show()
## Data where the residuals looks random is good.  Data where the residuals follow a patter, such as a curve, suggest we're missing something in our training
##Example code (from class) on charting the residuals for training and testing data on the same plot.
plt.scatter(model.predict(X_train), model.predict(X_train - y_train), c="blue")
plt.scatter(model.predict(X_test), model.predict(X_test) - y_test, c="orange")


## changing categories to numbers used for testing
##Dummy encoding (Binary Encoded Data) creates another column and uses 0 if False (Data is in the original colum) or 1 if True (Data was in orginal column)
# For instance,  if row 1 column 1 contains "male"  that's a 1 in the male created column.
#example data
gender   age bracket
male        under 16
female      over 16
male        over 16

#Using the following code:
data = X.copy() ## This makes a copy of the above data
data_binary_encoded = pd.get_dummies(data, columns=["gender"])
#returns:
gender   age bracket   gender_Female     gender_Male
male        under 16      0                 1
female      over 16       1                 0
male        over 16       0                 1
#If you want to use get dummies for all of the number numbers
data_binary_encoded = pd.get_dummies(data)
#returns
gender   age bracket   gender_Female     gender_Male  age bracket_under16   age bracket_over16
male        under 16      0                 1           1                       0
female      over 16       1                 0           0                       1
male        over 16       0                 1           0                       1


## Scaling and normalizing data -- especially important for models that use gradient descent algorithms
#common scaling options are minmax and StandardScaler.  StandardScaler is preferred if you don't know anything about your data.
#Standard scaler applies a Guassian distribution to the data.  the mean is 0 ad teh standard deviation is 1.

#Step 1 is to split your data.
from sklearn.preprocessing import StandardScaler
X_scaler = StandardScaler().fit(X_train)
y_scaler = StandardScaler().fit(y_train)
    #Then use scaler to create the scaled dataset
X_train_scaled = X_scaler.transform(X_train)
X_test_scaled = X_scaler.transform(X_test)
y_train_scaled = y_scaler.transform(y_train)
y_test_scaled = y_scaler.transform(y_test)
    # To create plots that show the difference between scaled data and non scaled data, use this code straight from class
    # The scaled data looks more spread out.
fig1 = plt.figure(figsize=(12, 6))
axes1 = fig1.add_subplot(1, 2, 1)
axes2 = fig1.add_subplot(1, 2, 2)

axes1.set_title("Original Data")
axes2.set_title("Scaled Data")

maxx = X_train["size"].max()
maxy = y_train.max()
axes1.set_xlim(-maxx + 1, maxx + 1)
axes1.set_ylim(-maxy + 1, maxy + 1)

axes2.set_xlim(-2, 2)
axes2.set_ylim(-2, 2)

def set_axes(ax):
    ax.spines['left'].set_position('center')
    ax.spines['right'].set_color('none')
    ax.spines['bottom'].set_position('center')
    ax.spines['top'].set_color('none')
    ax.xaxis.set_ticks_position('bottom')
    ax.yaxis.set_ticks_position('left')
    
set_axes(axes1)
set_axes(axes2)

axes1.scatter(X_train["size"], y_train)
axes2.scatter(X_train_scaled[:,0], y_train_scaled[:])


## Logistic Regression -- Used for categories like Yes, No  or  Red vs Yellow.
#To generate data you can use make_blobs
from sklearn.datasets import make_blobs
X, y = make_blobs(centers=2, random_state=42)   
    ##  you can create a class of LogisticRegression which will sort your data into two bins
from sklearn.linear_model import LogisticRegression
classifier = LogisticRegression()
classifier.fit(X_train, y_train)  ## This creates your logistics regression model
    #Get the score.  
print(f"Training Data Score: {classifier.score(X_train, y_train)}")
print(f"Testing Data Score: {classifier.score(X_test, y_test)}")
    #Then see how close youre predictions where via table
predictions = classifier.predict(X_test)
pd.DataFrame({"Prediction": predictions, "Actual": y_test})
