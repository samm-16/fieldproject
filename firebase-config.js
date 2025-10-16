const admin = require('firebase-admin');

let db;

try {
  // Check if Firebase service account path is provided
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  const projectId = process.env.FIREBASE_PROJECT_ID;

  if (serviceAccountPath && projectId) {
    // Initialize with service account file
    const serviceAccount = require(serviceAccountPath);
    
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: projectId
      });
    }
    
    db = admin.firestore();
    console.log('✅ Firebase initialized successfully');
    
  } else {
    // Mock Firebase for development/testing when credentials are not available
    console.log('⚠️  Firebase credentials not found. Using mock database for testing.');
    console.log('   To use real Firebase, set FIREBASE_SERVICE_ACCOUNT_PATH and FIREBASE_PROJECT_ID in .env');
    
    // Create a mock database object for testing
    db = {
      collection: (collectionName) => ({
        add: async (data) => {
          console.log(`Mock DB: Adding to ${collectionName}:`, data);
          return { id: `mock_${Date.now()}` };
        },
        get: async () => {
          console.log(`Mock DB: Getting from ${collectionName}`);
          return {
            forEach: (callback) => {
              // Mock data for testing
              callback({
                id: 'mock_1',
                data: () => ({
                  name: 'Test User',
                  email: 'test@example.com',
                  phone: '1234567890',
                  idea: 'Test idea',
                  createdAt: new Date()
                })
              });
            }
          };
        },
        orderBy: () => ({
          get: async () => ({
            forEach: (callback) => {
              callback({
                id: 'mock_1',
                data: () => ({
                  name: 'Test User',
                  email: 'test@example.com',
                  phone: '1234567890',
                  idea: 'Test idea',
                  createdAt: new Date()
                })
              });
            }
          })
        }),
        doc: (id) => ({
          get: async () => ({
            exists: true,
            id: id,
            data: () => ({
              name: 'Test User',
              email: 'test@example.com',
              phone: '1234567890',
              idea: 'Test idea',
              createdAt: new Date()
            })
          }),
          delete: async () => {
            console.log(`Mock DB: Deleting document ${id}`);
            return true;
          }
        })
      })
    };
  }
} catch (error) {
  console.error('Firebase initialization error:', error.message);
  console.log('Using mock database for testing...');
  
  // Fallback to mock database
  db = {
    collection: (collectionName) => ({
      add: async (data) => {
        console.log(`Mock DB: Adding to ${collectionName}:`, data);
        return { id: `mock_${Date.now()}` };
      },
      get: async () => ({
        forEach: (callback) => {
          callback({
            id: 'mock_1',
            data: () => ({
              name: 'Test User',
              email: 'test@example.com',
              phone: '1234567890',
              idea: 'Test idea',
              createdAt: new Date()
            })
          });
        }
      }),
      orderBy: () => ({
        get: async () => ({
          forEach: (callback) => {
            callback({
              id: 'mock_1',
              data: () => ({
                name: 'Test User',
                email: 'test@example.com',
                phone: '1234567890',
                idea: 'Test idea',
                createdAt: new Date()
              })
            });
          }
        })
      }),
      doc: (id) => ({
        get: async () => ({
          exists: true,
          id: id,
          data: () => ({
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
            idea: 'Test idea',
            createdAt: new Date()
          })
        }),
        delete: async () => {
          console.log(`Mock DB: Deleting document ${id}`);
          return true;
        }
      })
    })
  };
}

module.exports = { admin, db };