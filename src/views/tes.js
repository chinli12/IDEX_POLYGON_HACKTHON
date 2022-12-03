{
  posts.length > 0 ? (
    posts.map((post, key) => {
      return (
        <div
          key={key}
          className="col-lg-12 my-3 mx-auto"
          style={{ width: "1000px" }}
        >
          <Card border="primary">
            <Card.Header>
              <img
                className="mr-2"
                width="30"
                height="30"
                src={post.author.avatar}
              />
              <small className="ms-2 me-auto d-inline">
                {post.author.username}
              </small>
              <small className="mt-1 float-end d-inline">
                {post.author.address}
              </small>
            </Card.Header>
            <Card.Body color="secondary">
              <Card.Title>{post.content}</Card.Title>
            </Card.Body>
            <Card.Footer className="list-group-item">
              <div className="d-inline mt-auto float-start">
                Tip Amount: {ethers.utils.formatEther(post.tipAmount)} ETH
              </div>
              {address === post.author.address || !hasProfile ? null : (
                <div className="d-inline float-end">
                  <Button
                    onClick={() => tip(post)}
                    className="px-0 py-0 font-size-16"
                    variant="link"
                    size="md"
                  >
                    Tip for 0.1 ETH
                  </Button>
                </div>
              )}
            </Card.Footer>
          </Card>
        </div>
      );
    })
  ) : (
    <div className="text-center">
      <main style={{ padding: "1rem 0" }}>
        <h2>No posts yet</h2>
      </main>
    </div>
  );
}
