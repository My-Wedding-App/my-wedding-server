# Set global variables to create docker image
DOCKER_REGISTRY_PATH="asithalakshan97/my-wedding-server"
GIT_COMMIT_AS_DOCKER_IMAGE_VERSION=$(git log -n 1 --pretty=format:'%H' | cut -c -10)
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# If there are uncommitted changes not allowed to continue 
# if [ -n "$(git status -s)" ]; then
#  echo "You are not allowed to build when there are uncommitted changes in your working tree!" > /dev/stderr
#  exit 1
# fi

# Build args and tags based on current git branch
case ${GIT_BRANCH} in
  "master")
    DOCKER_IMAGE_TAG="${DOCKER_REGISTRY_PATH}-production:${GIT_COMMIT_AS_DOCKER_IMAGE_VERSION}"
    ;;
  "dev")
    DOCKER_IMAGE_TAG="${DOCKER_REGISTRY_PATH}-dev:${GIT_COMMIT_AS_DOCKER_IMAGE_VERSION}"
    ;;
  *)
    echo "You are building on branch: ${GIT_BRANCH}!" > /dev/stderr
    echo -n "Are you sure? "
    read ans || exit 1
    if [ "$ans" != 'y' -a "$ans" != 'Y' ]
    then
      exit 1
    fi
    echo "OK.  Will build assuming 'dev' settings..."
    # assume dev settings
    DOCKER_IMAGE_TAG="${DOCKER_REGISTRY_PATH}/dev:${GIT_COMMIT_AS_DOCKER_IMAGE_VERSION}"
  ;;
esac

# Build docker image
echo "Build ${DOCKER_IMAGE_TAG} docker image"
docker build -t "${DOCKER_IMAGE_TAG}" .

# Push docker image to azure container registry
echo "Push ${DOCKER_IMAGE_TAG} docker image to azure container registry"
docker push "${DOCKER_IMAGE_TAG}"
