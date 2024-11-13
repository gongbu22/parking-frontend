pipeline {
    agent any

    environment {
        DOCKER_IMAGE_OWNER = 'dangdang42'
        DOCKER_BUILD_TAG = "v${env.BUILD_NUMBER}"
        DOCKER_PWD = credentials('dockerhub')
        GIT_CREDENTIALS = credentials('github_access')
        REPO_URL = 'gongbu22/project-parking-CD.git'
        COMMIT_MESSAGE = 'Update README.md via Jenkins Pipeline'
    }

    stages {
        stage('clone from SCM') {
            steps {
                sh '''
                rm -rf parking-frontend
                git clone https://github.com/gongbu22/parking-frontend.git
                '''
            }
        }

        stage('Docker Image Building') {
            steps {
                dir('parking-frontend'){
                sh '''
                docker build --platform linux/arm64 -t ${DOCKER_IMAGE_OWNER}/arm64-nginx:latest -t ${DOCKER_IMAGE_OWNER}/arm64-nginx:${DOCKER_BUILD_TAG} -f ./msa-frontend/nginx-Dockerfile ./msa-frontend
                docker tag ${DOCKER_IMAGE_OWNER}/arm64-nginx:latest ${DOCKER_IMAGE_OWNER}/arm64-nginx:${DOCKER_BUILD_TAG}
                docker build --platform linux/arm64 -t ${DOCKER_IMAGE_OWNER}/arm64-nodejs:latest -t ${DOCKER_IMAGE_OWNER}/arm64-nodejs:${DOCKER_BUILD_TAG} -f ./msa-frontend/nodejs-Dockerfile ./msa-frontend
                docker tag ${DOCKER_IMAGE_OWNER}/arm64-nodejs:latest ${DOCKER_IMAGE_OWNER}/arm64-nodejs:${DOCKER_BUILD_TAG}
                '''
                }
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USR', passwordVariable: 'DOCKER_PWD')]) {
                sh "echo $DOCKER_PWD | docker login -u $DOCKER_USR --password-stdin"}
            }
        }

        stage('Docker Image pushing') {
            steps {
                sh '''
                docker push ${DOCKER_IMAGE_OWNER}/arm64-nginx:${DOCKER_BUILD_TAG}
                docker push ${DOCKER_IMAGE_OWNER}/arm64-nginx:latest
                docker push ${DOCKER_IMAGE_OWNER}/arm64-nodejs:${DOCKER_BUILD_TAG}
                docker push ${DOCKER_IMAGE_OWNER}/arm64-nodejs:latest
                '''
            }
        }

        stage('Docker Logout') {
            steps {
                sh '''
                docker logout
                '''
            }
        }

        stage('Clone Repository') {
            steps {
                sh '''
                rm -rf project-parking-CD
                git clone https://github.com/${REPO_URL}
                '''
            }
        }

        stage('Modify README.md') {
            steps {
                sh """
                    cd project-parking-CD
                    echo "\nThis README was updated by frontend(gongbu22) Build #${env.BUILD_NUMBER} on \$(date)" >> README.md
                """
            }
        }

        stage('Update values.yaml') {
            steps {
                sh """
                    cd project-parking-CD/project-parking
                    sed -i 's|NODEJS_IMG: .*|NODEJS_IMG: ${DOCKER_IMAGE_OWNER}/arm64-nodejs:${DOCKER_BUILD_TAG}|' values.yaml
                    sed -i 's|NGINX_IMG: .*|NGINX_IMG: ${DOCKER_IMAGE_OWNER}/arm64-nginx:${DOCKER_BUILD_TAG}|' values.yaml
                """
            }
        }

        stage('Commit Changes') {
            steps {
                dir('project-parking-CD') {
                sh '''
                    git config user.name "gongbu22"
                    git config user.email "pyujin0711@naver.com"
                    git add README.md project-parking/values.yaml
                    git commit -m "${COMMIT_MESSAGE}"
                '''
                }
            }
        }

        stage('Push Changes') {
            steps {
                dir('project-parking-CD') {
                sh '''
                    git push https://${GIT_CREDENTIALS_USR}:${GIT_CREDENTIALS_PSW}@github.com/${REPO_URL} main
                '''
                }
            }
        }
    }
}
