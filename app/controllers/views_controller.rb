class ViewsController < ApplicationController

	# POST /views
  # POST /views.json
  def create
  	@view = View.new(view_params)
    respond_to do |format|
      if @view.save
        format.html { redirect_to @view, notice: 'View was successfully created.' }
        format.json { render json: @view, status: :created, location: @view }
      else
        format.html { render action: "new" }
        format.json { render json: @view.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /views/1
  # PUT /views/1.json
  def update
    @view = View.find(params[:id])

    respond_to do |format|
      if @view.update(view_params)
        format.html { redirect_to @view, notice: 'View was successfully updated.' }
        format.json { render json: @view }
      else
        format.html { render action: "edit" }
        format.json { render json: @view.errors, status: :unprocessable_entity }
      end
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_view
    @app = View.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def view_params
    params.require(:view).permit(:background_color, :screen_id, :origin_x, :origin_y, :width, :height)
  end
end
