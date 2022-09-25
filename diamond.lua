height = 151  -- Must be odd

for i = 0, height - 1, 1 do
	if i < (height + 1) / 2 then
		n = i
	else
		n = height - 1 - i
	end
	
	print(string.rep(" ", height / 2 - n) .. (string.rep("*", 2*n + 1)))
end

-- better
local function diamond(h)
	local vertex = {(h-1) / 2, h}

	for i = 0,h-1,1 do
		local numAsterisks = -2 * math.abs(i - vertex[1]) + vertex[2]
		print(string.rep(' ', (h - numAsterisks) / 2) 
			.. string.rep('*', numAsterisks))
	end
end
