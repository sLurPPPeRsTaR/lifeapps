library('jenkins-shared-library') _
pipeline {
    agent none
    stages {
        stage('build/scan-sast') {
         parallel {
           stage ("security-fortify-scan") {
             agent {
               node {
                 label 'sast'
               }
             }
             environment {
               fortify_app_name = 'customerMobileApps'
               fortify_app_version = '1.0'
             }
             steps {
               withCredentials([string(credentialsId: '14b7283c-954f-49c2-946e-c7d289f3d3e1', variable: 'fortify_token')]) {
                   sh '''
                   set +x
                     echo "=================================================="
                     echo "========--- SAST - Fortify Scan: Start ---========"
                     echo "=================================================="
                     scancentral -url https://fortifysast.ifg-life.id:8443/scancentral-ctrl/ start \
                                 -snm \
                                 -bt none \
                                 -upload \
                                 -uptoken $fortify_token \
                                 -version ${fortify_app_version} \
                                 -application ${fortify_app_name}
                     echo "=================================================="
                     echo "=========--- SAST - Fortify Scan: End ---========="
                     echo "===TO VIEW THE RESULT VISIT https://fortifyssc.ifg-life.id:8443/ssc==="
                     '''
                   script {
                     if (env.BRANCH_NAME == 'master') {
                       nexus='release'
                     } else if (env.BRANCH_NAME == 'uat') {
                       nexus='stage-release'
                     } else if (env.BRANCH_NAME == 'dev' || env.BRANCH_NAME == 'dev_build' ) {
                       nexus='build'
                     }
                  
                     sh '''
                     echo "==========================================================================================================================================="
                     echo "============================================================= OSS - Nexus Scan ============================================================"
                     echo "==========================================================================================================================================="
                     '''
                     String result = nexusscan("customerMobileApps", "$WORKSPACE", "$nexus");
                     echo result;
                   }
               }
             }
           }
         stage('CodePush Android') {
          when { beforeAgent true 
           branch '*_codepush' 
          }
            agent {
              node {
                label 'codepushs-android'
              }
            }
            steps {

                   withCredentials([
                   usernamePassword(credentialsId: '38b2b744-0deb-4a1e-a33a-666611680cb0', usernameVariable: 'APPCENTERUSERNAME', passwordVariable: 'APPCENTERTOKEN'),
                   usernamePassword(credentialsId: 'bede60e9-ac4c-48f5-9575-8f4debf148bf', usernameVariable: 'ARTIUSERNAME', passwordVariable: 'ARTIPASSWORD')]){
                    sh '''
                    set +x
                    
                    IN=${BRANCH_NAME}
                    arrIN=(${IN//_/ })
                    
                    if [ "prod" == ${arrIN[0]} ] || [ "release" == ${arrIN[0]} ]
                    then
                    echo 'SET PROD or RELEASE to prd'
                    arrIN[0]="prd"
                    echo ${arrIN[0]}
                    fi

                     echo 'GET env from BRANCH NAME'
                    curl -X GET -u ${ARTIUSERNAME}:${ARTIPASSWORD} https://repository.ifg-life.id/artifactory/generic-customer-local/customer-mobile-apps/environment/.env.${arrIN[0]} -o .env.${arrIN[0]}
                    ls -alh

                    echo 'SET ANDROID VERSION NAME'
                    ANDROID_VERSION_NAME=$(cat .env.${arrIN[0]} | grep 'ANDROID_VERSION_NAME' | awk '{split($0,a,"="); print a[2]}')
                    echo $ANDROID_VERSION_NAME

                    echo 'TEMP - SET ENVIRONMENT ANDROID_SDK_ROOT to android-sdk folder'
                    export ANDROID_SDK_ROOT=/android-sdk

                    npm config set loglevel warn
                    npm install --silent -g react-native-cli
                    yarn install
                    
                    npm install -g appcenter-cli
                    appcenter login --token ${APPCENTERTOKEN}
                    ENVFILE=.env appcenter codepush release-react -a app.dev-ifg-life.id/Customer-Apps -d ${arrIN[0]} -t $ANDROID_VERSION_NAME
                    '''
                  }
                }
         }
        stage('Build Android') {
          when { beforeAgent true 
           branch '*_build' 
          }
            agent {
              node {
                label 'build-android'
              }
            }
            steps {
                     withCredentials([
                    usernamePassword(credentialsId: '38b2b744-0deb-4a1e-a33a-666611680cb0', usernameVariable: 'APPCENTERUSERNAME', passwordVariable: 'APPCENTERTOKEN'),
                    usernamePassword(credentialsId: 'bede60e9-ac4c-48f5-9575-8f4debf148bf', usernameVariable: 'ARTIUSERNAME', passwordVariable: 'ARTIPASSWORD')]){
                    sh '''
                     set +x
                    
                    IN=${BRANCH_NAME}
                    arrIN=(${IN//_/ })
                    
                    
                    if [ "prod" == ${arrIN[0]} ] || [ "release" == ${arrIN[0]} ]
                    then
                    echo 'SET PROD or RELEASE to prd'
                    arrIN[0]="prd"
                    echo ${arrIN[0]}
                    fi
                    
                    echo 'GET env from BRANCH NAME'
                    curl -X GET -u ${ARTIUSERNAME}:${ARTIPASSWORD} https://repository.ifg-life.id/artifactory/generic-customer-local/customer-mobile-apps/environment/.env.${arrIN[0]} -o .env.${arrIN[0]}
                    ls -alh

                    echo 'GET keystore from BRANCH NAME'
                    curl -X GET -u ${ARTIUSERNAME}:${ARTIPASSWORD} https://repository.ifg-life.id/artifactory/generic-customer-local/customer-mobile-apps/keystore/customerapp-${arrIN[0]}.keystore -o customerapp-${arrIN[0]}.keystore
                    ls -alh

                    echo 'COPY keystore to android/app'
                    mv customerapp-${arrIN[0]}.keystore android/app/customerapp-${arrIN[0]}.keystore

                    ls -alh android/app/

                    echo 'SET ANDROID VERSION NAME'
                    ANDROID_VERSION_NAME=$(cat .env.${arrIN[0]} | grep 'ANDROID_VERSION_NAME' | awk '{split($0,a,"="); print a[2]}')
                    echo $ANDROID_VERSION_NAME

                    echo 'TEMP - SET ENVIRONMENT ANDROID_SDK_ROOT to android-sdk folder'
                    export ANDROID_SDK_ROOT=/android-sdk
                    echo $ANDROID_SDK_ROOT

                    echo 'SET local.properties to android'
                    echo "sdk.dir=/android-sdk" >> android/local.properties

                    npm config set loglevel warn
                    npm install --silent -g react-native-cli
                    yarn install
                    
                    npm install -g appcenter-cli
                    appcenter login --token ${APPCENTERTOKEN}

                    echo 'SET ASSEMBLECOMMAND'

                    ASSEMBLECOMMAND="";

                    if [ "prd" == ${arrIN[0]} ]
                    then
                    ASSEMBLECOMMAND="assemblePrdRelease"
                    elif [ "uat" == ${arrIN[0]} ]
                    then
                    ASSEMBLECOMMAND="assembleUatRelease"
                    else
                    ASSEMBLECOMMAND="assembleDevRelease"
                    fi
                    echo 'the assemblecommand is : '
                    echo ${ASSEMBLECOMMAND}

                    cd android && gradle ${ASSEMBLECOMMAND} && cd ..

                    echo 'CHECK ARTIFACT IN ANDROID FOLDER'

                    ls -alh android/app/build/outputs/apk/
                    ls -alh android/app/build/outputs/apk/${arrIN[0]}/
                    ls -alh android/app/build/outputs/apk/${arrIN[0]}/release/

                    echo 'DEPLOY TO APPCENTER'

                    appcenter distribute release --quiet -f android/app/build/outputs/apk/${arrIN[0]}/release/app-${arrIN[0]}-release.apk --token ${APPCENTERTOKEN} --app app.dev-ifg-life.id/Customer-Apps -g "qa,developer" --release-notes-file release-note.txt

                    '''
                        }
                    }
                }
      //  stage('Build IOS') {
      //     when { beforeAgent true 
      //      branch '*_build' 
      //     }
      //       agent {
      //         node {
      //           label 'build-ios'
      //         }
      //       }
      //       steps {
      //               //configFileProvider([configFile(fileId: 'fb592ada-e638-4fee-a65e-05bc81c4cbcf', variable: 'MAVEN_SETTINGS')]) {
      //               sh '''
      //               set +x
      //               node --version
      //               apk add --update --no-cache make g++ python3 curl
      //               mkdir app
      //               yarn install --network-timeout 1000000000
      //               yarn build && yarn export
      //               ls -lrth
      //               pwd
      //               cp -r out/ default.conf app/
      //               ls -lrth app/
      //               '''
      //               stash includes: 'app/', name: 'app'
      //               }
      //           }        
            }
        }      
    }
}
